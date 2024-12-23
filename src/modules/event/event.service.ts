import { Injectable } from '@nestjs/common';


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
import { EventDTO } from './dtos/event.dto';
import { Events, EventsDocument } from './schema/event.schema';

@Injectable()
export class EventsService {
    private s3: S3Client;
    private readonly bucketName: string;

    constructor(
        @InjectModel(Events.name) private _eventModel: Model<EventsDocument>,
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

    async create(eventDTO: EventDTO): Promise<any> {
        try {
          eventDTO['status'] = CONSTANTS_STATUS.ACTIVE;
            const response = await new this._eventModel(eventDTO);
            response.save();

            if (
                eventDTO.images &&
                Array.isArray(eventDTO.images) &&
                eventDTO.images.length > 0
            ) {
                await this.uploadImagesToS3(eventDTO.images, response);
            }

            if (response) {
                return {
                    data: response,
                    menssage: 'Evento creada con exito',
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

    async update(eventDTO: EventDTO, idPlace): Promise<IResponse> {
        const response = await this._eventModel.findByIdAndUpdate(
            idPlace,
            eventDTO,
            { new: true },
        );
        if (response?._id) {
            return {
                data: response,
                menssage: 'Evento actualizada con exito',
                status: 200,
            };
        } else {
            return {
                data: response,
                menssage: 'Evento no encontrado',
                status: 400,
            };
        }
    }

    async delete(IdPlace: string): Promise<IResponse> {
        const response = await this._eventModel.findByIdAndUpdate(
            IdPlace,
            { status: 'INACTIVE' },
            { new: true },
        );

        if (response?._id) {
            await this.deleteFolderFromS3(IdPlace);
            return {
                data: response,
                menssage: 'Evento eliminado con exito',
                status: 200,
            };
        } else {
            return {
                data: response,
                menssage: 'Evento no encontrado',
                status: 400,
            };
        }
    }

    async listar(): Promise<IResponse> {
        try {
            const response = await this._eventModel.find({
                status: 'ACTIVE',
            });

            if (response.length) {
                return {
                    data: response,
                    menssage: 'Lista de Evento',
                    status: 200,
                };
            } else {
                return {
                    data: [],
                    menssage: 'Evento no encontrados',
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

    async getEventById(idPlace: string): Promise<IResponse> {
        try {
            const response = await this._eventModel.findOne({
                _id: new mongo.ObjectId(idPlace),
                status: 'ACTIVE',
            });

            if (response == null) {
                return {
                    data: [],
                    menssage: 'Evento no encontrada o inactivo',
                    status: 400,
                };
            }

            return {
                data: response,
                menssage: 'Eventos encontrados',
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
        responseData: any,
    ): Promise<any[]> {
    
    
        let arrayImages: any[] = [];

       
    
        //Carga de imagenes
        const uploadPromises = files.map((file) => {
            const key = `event/${responseData._id}/img/${file.originalname}`;
    
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

        await this._eventModel.updateOne(
            { _id: responseData._id },
            { imagesUrl: arrayImages },
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
