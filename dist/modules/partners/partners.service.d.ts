import { PartnerDTO } from './dtos/partners.dto';
import { PartnersDocument } from './schema/partners.schema';
import { Model } from "mongoose";
import { IResponse } from 'src/shared/utils/IResponse.util';
export declare class PartnerService {
    private _partnersModel;
    private s3;
    private readonly bucketName;
    constructor(_partnersModel: Model<PartnersDocument>);
    createPartner(partnersDTO: PartnerDTO): Promise<any>;
    update(partnersDTO: PartnerDTO, idPartner: any): Promise<IResponse>;
    delete(IdPartner: string): Promise<IResponse>;
    listar(): Promise<IResponse>;
    getPartnerByCategory(categoryId: string, userId?: string): Promise<IResponse>;
    getPartnerById(idPartner: string): Promise<IResponse>;
    filterPartnersByCategory(body: any): Promise<IResponse>;
    private uploadImagesToS3;
    deleteFolderFromS3(folderName: any): Promise<void>;
}
