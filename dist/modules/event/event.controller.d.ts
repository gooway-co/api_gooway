import { EventsService } from './event.service';
import { EventDTO } from './dtos/event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    createPlace(eventDTO: EventDTO, files: Express.Multer.File[]): Promise<any>;
    updateCompany(categoriDTO: EventDTO, IdPlace: any): Promise<import("../../shared/utils/IResponse.util").IResponse>;
    deleteCompany(IdPlace: any): Promise<import("../../shared/utils/IResponse.util").IResponse>;
    listar(): Promise<import("../../shared/utils/IResponse.util").IResponse>;
    findById(IdPlace: any): Promise<import("../../shared/utils/IResponse.util").IResponse>;
}
