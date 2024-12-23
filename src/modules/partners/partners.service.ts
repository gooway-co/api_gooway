import { Injectable } from '@nestjs/common';
import { PartnerDTO } from './dtos/partners.dto';
import { Partners, PartnersDocument } from './schema/partners.schema';
import { Model, mongo } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CONSTANTS_STATUS } from 'src/shared/utils/status.constant';
import { IResponse } from 'src/shared/utils/IResponse.util';
import {
    S3Client,
    PutObjectCommand,
    ListObjectsV2Command,
    DeleteObjectCommand,
    DeleteObjectsCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export class PartnerService {
    private s3: S3Client;
    private readonly bucketName: string;

    constructor(
        @InjectModel(Partners.name) private _partnersModel: Model<PartnersDocument>,
    ){ 
        this.s3 = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        this.bucketName = process.env.AWS_S3_BUCKET_NAME;

    }

    async createPartner(partnersDTO: PartnerDTO):Promise<any> {

        try{

            partnersDTO.status = CONSTANTS_STATUS.ACTIVE; 
            const response  = await new this._partnersModel(partnersDTO);
            response.save(); 

            if(response){
                await this.uploadImagesToS3(partnersDTO.images, response);

                return {
                    data: response,
                    menssage: "Aliado creado con exito",
                    status: 200
                }
            }

        } catch( error) {
            return {
                data: [],
                menssage: error.message,
                status: 500
            }
        }

    }
 

    async update(partnersDTO: PartnerDTO, idPartner): Promise<IResponse> {
        const response =  await this._partnersModel.findByIdAndUpdate(idPartner,
            partnersDTO, { new: true });
            if (response?._id) {
                return {
                    data: response,
                    menssage: "Partnera actualizada con exito",
                    status: 200
                }
            }else{
                return {
                    data: response,
                    menssage: "Partnera no encontrado",
                    status: 400
                }
            }
      
    }

    async delete(IdPartner: string): Promise<IResponse>{
        const response = await this._partnersModel.findByIdAndUpdate(IdPartner,
            {status: "INACTIVE"}, { new: true });;
        if (response?._id) {
            await this.deleteFolderFromS3(response?._id);
            return {
                data: response,
                menssage: "Partnera eliminado con exito",
                status: 200
            }
        }else{
            return {
                data: response,
                menssage: "Partnera no encontrado",
                status: 400
            }
        }
       
    } 

    async listar(): Promise<IResponse>{ 

        try {
            const response = await this._partnersModel.find({status: "ACTIVE"});
    
            if (response.length) {
                return {
                    data: response,
                    menssage: "Lista de aliados",
                    status: 200
                }
            } else {
                return {
                    data: [],
                    menssage: "Aliados no encontrados",
                    status: 400
                }
            } 
        } catch (error) {
            return {
                data: [],
                menssage: error,
                status: 500
            }   
        }
   
    }

    async getPartnerByCategory(categoryId: string, userId?: string): Promise<IResponse> {
        try {
            const response = await this._partnersModel.aggregate([
                {
                    $match: {
                        categoryId: new mongo.ObjectId(categoryId),
                        status: "ACTIVE"
                    }
                },
                {
                    $lookup: {
                        from: "favorites", // Nombre de la colección de favoritos
                        localField: "_id",
                        foreignField: "partnerId",
                        as: "favorites"
                    }
                },
                {
                    $addFields: {
                        favorite: {
                            $cond: {
                                if: {
                                    $and: [
                                        { $ifNull: [userId, false] }, // Verifica si se proporcionó un userId
                                        {
                                            $anyElementTrue: {
                                                $map: {
                                                    input: "$favorites",
                                                    as: "favorite",
                                                    in: {
                                                        $eq: ["$$favorite.userId", userId ? new mongo.ObjectId(userId) : null]
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                then: true,
                                else: false
                            }
                        }
                    }
                },
                {
                    $project: {
                        favorites: 0 // Excluye la lista de favoritos del resultado
                    }
                }
            ]);
    
            if (response.length) {
                return {
                    data: response,
                    menssage: "Lista de aliados por categoría",
                    status: 200
                };
            } else {
                return {
                    data: [],
                    menssage: "Aliados no encontrados",
                    status: 400
                };
            }
        } catch (error) {
            return {
                data: [],
                menssage: error.message || "Error interno del servidor",
                status: 500
            };
        }
    }
    

    async getPartnerById(idPartner: string): Promise<IResponse> {
        try {
            const response = await this._partnersModel.findOne({ _id: new mongo.ObjectId(idPartner), status: 'ACTIVE' });
            
            if (response == null) {
                return {
                    data: [],
                    menssage: "Partnera no encontrada o inactivo",
                    status: 400
                }
            }  

            return {
                data: response,
                menssage: "Partneras encontrados",
                status: 200
            }

        } catch (error) {
            return {
                data: [],
                menssage: error.message,
                status: 400
            }
        }
    }


    async filterPartnersByCategory(body: any) : Promise<IResponse>{
        let textoABuscar = body.text;
        let categoryId = body.categoryId;


        const response = await this._partnersModel.find({categoryId: categoryId, $and: [
            { name: { $regex: textoABuscar, $options: "i" } },
          ]
        });
    
        if (response.length) {
            return {
                data: response,
                menssage: "Lista de clientes",
                status: 200
            }
        } else {
            return {
                data: [],
                menssage: "clientes no encontrados",
                status: 400
            }
        }  
    }

    private async uploadImagesToS3(
        files: any[],
        responseData: any,
    ): Promise<any[]> {
    
        let arrayImages: any[] = [];
        if(files == null || files == undefined) {
            return;
        }

        const uploadPromises = files.map((file) => {
            const key = `partners/${responseData._id}/img/${file.originalname}`;
    
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

        await this._partnersModel.updateOne(
            { _id: responseData._id },
            { imagesUrl: arrayImages },
        );
    
        arrayImages = [...arrayImages];    
        return arrayImages;
    }

    async deleteFolderFromS3(folderName) {
        try {
            const prefix = `partners/${folderName}/`;

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
