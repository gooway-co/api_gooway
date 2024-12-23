import { Model } from 'mongoose';
import { IResponse } from 'src/shared/utils/IResponse.util';
import { EventDTO } from './dtos/event.dto';
import { EventsDocument } from './schema/event.schema';
export declare class EventsService {
    private _eventModel;
    private s3;
    private readonly bucketName;
    constructor(_eventModel: Model<EventsDocument>);
    create(eventDTO: EventDTO): Promise<any>;
    update(eventDTO: EventDTO, idPlace: any): Promise<IResponse>;
    delete(IdPlace: string): Promise<IResponse>;
    listar(): Promise<IResponse>;
    getEventById(idPlace: string): Promise<IResponse>;
    private uploadImagesToS3;
    convertBase64ToBuffer(base64String: string, originalname: string, mimetype: string): any;
    deleteFolderFromS3(folderName: any): Promise<void>;
}
