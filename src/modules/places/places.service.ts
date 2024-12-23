import { Injectable } from '@nestjs/common';
import { PlaceDTO } from './dtos/places.dto';
import { Places, PlacesDocument } from './schema/places.schema';
import { Model, mongo } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CONSTANTS_STATUS } from 'src/shared/utils/status.constant';
import { IResponse } from 'src/shared/utils/IResponse.util';
import {
    S3Client,
    PutObjectCommand,
    ListObjectsV2Command,
    DeleteObjectCommand,
    DeleteObjectsCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid'; // Para generar nombres únicos de archivo

@Injectable()
export class PlaceService {
    private s3: S3Client;
    private readonly bucketName: string;

    constructor(
        @InjectModel(Places.name) private _placesModel: Model<PlacesDocument>,
    ) {
        this.s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        this.bucketName = process.env.AWS_S3_BUCKET_NAME;
    }

    async createPlace(datos: any): Promise<any> {
        try {
            datos['status'] = CONSTANTS_STATUS.ACTIVE;
            const response = await new this._placesModel(datos);
            response.save();

            if (
                datos.images &&
                Array.isArray(datos.images) &&
                datos.images.length > 0
            ) {
                await this.uploadImagesToS3(datos.images, datos.audio, response);
            }

            if (response) {
                return {
                    data: response,
                    menssage: 'Placea creada con exito',
                    status: 200,
                };
            }
        } catch (error) {
            return {
                data: [],
                message: error.message,
                status: 500,
            };
        }
    }

    async update(placesDTO: PlaceDTO, idPlace): Promise<IResponse> {
        const response = await this._placesModel.findByIdAndUpdate(
            idPlace,
            placesDTO,
            { new: true },
        );
        if (response?._id) {
            return {
                data: response,
                menssage: 'Placea actualizada con exito',
                status: 200,
            };
        } else {
            return {
                data: response,
                menssage: 'Placea no encontrado',
                status: 400,
            };
        }
    }

    async delete(IdPlace: string): Promise<IResponse> {
        const response = await this._placesModel.findByIdAndUpdate(
            IdPlace,
            { status: 'INACTIVE' },
            { new: true },
        );

        if (response?._id) {
            await this.deleteFolderFromS3(IdPlace);
            return {
                data: response,
                menssage: 'Placea eliminado con exito',
                status: 200,
            };
        } else {
            return {
                data: response,
                menssage: 'Placea no encontrado',
                status: 400,
            };
        }
    }

    async filterPlaceByCompany(body: any): Promise<IResponse> {
        try {
            const response = await this._placesModel.find({
                companyId: new mongo.ObjectId(body.companyId),
                status: 'ACTIVE',
            });

            if (response.length) {
                return {
                    data: response,
                    menssage: 'Lista de lugares',
                    status: 200,
                };
            } else {
                return {
                    data: [],
                    menssage: 'Lugares no encontrados',
                    status: 400,
                };
            }
        } catch (error) {
            return {
                data: [],
                menssage: error.message,
                status: 500,
            };
        }
    }

    async getPlaceById(idPlace: string): Promise<IResponse> {
        try {
            const response = await this._placesModel.findOne({
                _id: new mongo.ObjectId(idPlace),
                status: 'ACTIVE',
            });

            if (response == null) {
                return {
                    data: [],
                    menssage: 'Placea no encontrada o inactivo',
                    status: 400,
                };
            }

            return {
                data: response,
                menssage: 'Placeas encontrados',
                status: 200,
            };
        } catch (error) {
            return {
                data: [],
                menssage: error,
                status: 400,
            };
        }
    }

    private async uploadImagesToS3(
        files: any[],
        audio: any,
        responseData: any,
    ): Promise<any[]> {
    
        let audioBuffer = `data:audio/mp3;base64,${audio}`;
        let audioS3 = this.convertBase64ToBuffer(audioBuffer, "audio.mp3", "audio/mp3");
    
        let arrayImages: any[] = [];
        let audioUrl = "";

        if (audio) {
            
            const audioKey = `places/${responseData._id}/audio/${audioS3.originalname}`;
    
            const audioCommand = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: audioKey,
                Body: audioS3.buffer, 
                ContentType: audioS3.mimetype,
            });
    
            audioUrl = await this.s3.send(audioCommand).then((response) => {
                return `https://${this.bucketName}.s3.amazonaws.com/${audioKey}`;
            });
    
           
        }
    
        //Carga de imagenes
        const uploadPromises = files.map((file) => {
            const key = `places/${responseData._id}/img/${file.originalname}`;
    
            const command = new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: file.buffer, 
                ContentType: file.mimetype, 
            });
    
            return this.s3.send(command).then((response) => {
                const imageUrl = `https://${this.bucketName}.s3.amazonaws.com/${key}`;
                arrayImages.push(imageUrl);
                return imageUrl;
            });
        });
     

        arrayImages = await Promise.all(uploadPromises);

        await this._placesModel.updateOne(
            { _id: responseData._id },
            { imagesUrl: arrayImages, audio: audioUrl  },
        );
    
        arrayImages = [...arrayImages];    
        return arrayImages;
    }
    

    convertBase64ToBuffer(base64String: string, originalname: string, mimetype: string): any {
        const base64Data = base64String.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');
    
        return {
          fieldname: 'images',         
          originalname: originalname,  
          encoding: '7bit',            
          mimetype: mimetype,          
          buffer: buffer,              
          size: buffer.length
        };
    }


    async deleteFolderFromS3(folderName) {
        try {
            const prefix = `places/${folderName}/`;

            const listParams = {
                Bucket: this.bucketName,
                Prefix: prefix,
            };

            const listedObjects = await this.s3.send(
                new ListObjectsV2Command(listParams),
            );

            if (listedObjects.Contents.length === 0) {
                return;
            }

            const objectsToDelete = listedObjects.Contents.map((object) => ({
                Key: object.Key,
            }));

            const deleteParams = {
                Bucket: this.bucketName,
                Delete: {
                    Objects: objectsToDelete,
                },
            };

            const deleteResponse = await this.s3.send(
                new DeleteObjectsCommand(deleteParams),
            );

            if (listedObjects.Contents?.length === 0) {
                const deleteDirectoryCommand = new DeleteObjectCommand({
                    Bucket: this.bucketName,
                    Key: prefix,
                });
                await this.s3.send(deleteDirectoryCommand);
            }
        } catch (error) {
            console.error('Error deleting folder:', error);
        }
    }
}
