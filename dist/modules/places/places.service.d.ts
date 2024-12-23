import { PlaceDTO } from './dtos/places.dto';
import { PlacesDocument } from './schema/places.schema';
import { Model } from 'mongoose';
import { IResponse } from 'src/shared/utils/IResponse.util';
export declare class PlaceService {
    private _placesModel;
    private s3;
    private readonly bucketName;
    constructor(_placesModel: Model<PlacesDocument>);
    createPlace(datos: any): Promise<any>;
    update(placesDTO: PlaceDTO, idPlace: any): Promise<IResponse>;
    delete(IdPlace: string): Promise<IResponse>;
    filterPlaceByCompany(body: any): Promise<IResponse>;
    getPlaceById(idPlace: string): Promise<IResponse>;
    private uploadImagesToS3;
    convertBase64ToBuffer(base64String: string, originalname: string, mimetype: string): any;
    deleteFolderFromS3(folderName: any): Promise<void>;
}
