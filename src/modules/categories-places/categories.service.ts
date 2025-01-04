import { Injectable } from '@nestjs/common';
import { CategoryPlaceDTO } from './dtos/categories.dto';
import { CategoriesPlace, CategoriesPlaceDocument } from './schema/categories.schema';
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
export class CategoriService {
   
    private readonly bucketName: string;

    constructor(
        @InjectModel(CategoriesPlace.name) private _categoriesModel: Model<CategoriesPlaceDocument>,
        private readonly s3: S3Client,
    ){ 
        this.bucketName = process.env.AWS_S3_BUCKET_NAME;
    }

    async createCategory(categoriesDTO: CategoryPlaceDTO):Promise<any> {

        try{

            categoriesDTO.status = CONSTANTS_STATUS.ACTIVE; 
            const response  = await new this._categoriesModel(categoriesDTO);
            response.save(); 

            if(response){

                return {
                    data: response,
                    menssage: "Categoria creada con exito",
                    status: 200
                }
            }

        } catch( error) {
            return {
                data: [],
                menssage: error.menssage,
                status: 500
            }
        }

    }

    async update(categoriesDTO: CategoryPlaceDTO, idCategori): Promise<IResponse> {
        const response =  await this._categoriesModel.findByIdAndUpdate(idCategori,
            categoriesDTO, { new: true });
            if (response?._id) {
                return {
                    data: response,
                    menssage: "Categoria actualizada con exito",
                    status: 200
                }
            }else{
                return {
                    data: response,
                    menssage: "Categoria no encontrado",
                    status: 400
                }
            }
      
    }

    async delete(IdCategori: string): Promise<IResponse>{
        const response = await this._categoriesModel.findByIdAndUpdate(IdCategori,
            {status: "INACTIVE"}, { new: true });;
        if (response?._id) {
            await this.deleteFolderFromS3(response?._id);
            return {
                data: response,
                menssage: "Categoria eliminado con exito",
                status: 200
            }
        }else{
            return {
                data: response,
                menssage: "Categoria no encontrado",
                status: 400
            }
        }
       
    } 

    async listar(): Promise<any>{ 

        const response = await this._categoriesModel.find({status: "ACTIVE"});
        if (response.length) {
        
            return {
                data: response,
                menssage: "categorias encontradas",
                status: 200
            }
        } else {
            return {
                data: [],
                menssage: "categorias no encontradas",
                status: 400
            }
        }  
    }

    async getCategoriById(idCategori: string): Promise<IResponse> {
        try {
            const response = await this._categoriesModel.findOne({ _id: new mongo.ObjectId(idCategori), status: 'ACTIVE' });
            
            if (response == null) {
                return {
                    data: [],
                    menssage: "Categoria no encontrada o inactivo",
                    status: 400
                }
            }  

            return {
                data: response,
                menssage: "Categorias encontrados",
                status: 200
            }

        } catch (error) {
            return {
                data: [],
                menssage: error,
                status: 400
            }
        }
    }



    private async uploadImagesToS3(
        file: any,
        responseData: any,
    ): Promise<any> {
    
        const audioKey = `category/${responseData._id}/${file.originalname}`;
    
        const audioCommand = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: audioKey,
            Body: file.buffer, 
            ContentType: file.mimetype,
        });

        const imagaUrl = await this.s3.send(audioCommand).then((response) => {
            return `https://${this.bucketName}.s3.amazonaws.com/${audioKey}`;
        });

        await Promise.all(imagaUrl);

        const response = await this._categoriesModel.updateOne(
            { _id: responseData._id },
            { image: imagaUrl},
        );
  
        return response;
    }

    async deleteFolderFromS3(folderName) {
        try {
            const prefix = `category/${folderName}/`;

            const listParams = {
                Bucket: this.bucketName,
                Prefix: prefix,
            };

            const listedObjects = await this.s3.send(
                new ListObjectsV2Command(listParams),
            );

            if (listedObjects.Contents.length === 0) {
                console.log(`No objects found in folder: ${folderName}`);
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
