import { CategoryPlaceDTO } from './dtos/categories.dto';
import { CategoriesPlaceDocument } from './schema/categories.schema';
import { Model } from "mongoose";
import { IResponse } from 'src/shared/utils/IResponse.util';
import { S3Client } from '@aws-sdk/client-s3';
export declare class CategoriService {
    private _categoriesModel;
    private readonly s3;
    private readonly bucketName;
    constructor(_categoriesModel: Model<CategoriesPlaceDocument>, s3: S3Client);
    createCategory(categoriesDTO: CategoryPlaceDTO): Promise<any>;
    update(categoriesDTO: CategoryPlaceDTO, idCategori: any): Promise<IResponse>;
    delete(IdCategori: string): Promise<IResponse>;
    listar(): Promise<any>;
    getCategoriById(idCategori: string): Promise<IResponse>;
    private uploadImagesToS3;
    deleteFolderFromS3(folderName: any): Promise<void>;
}
