import { PlaceService } from './places.service';
import { PlaceDTO } from './dtos/places.dto';
export declare class PlaceController {
    private readonly _placesService;
    constructor(_placesService: PlaceService);
    createPlace(placeDTO: PlaceDTO, files: Express.Multer.File[]): Promise<any>;
    updateCompany(categoriDTO: PlaceDTO, IdPlace: any): Promise<import("../../shared/utils/IResponse.util").IResponse>;
    deleteCompany(IdPlace: any): Promise<import("../../shared/utils/IResponse.util").IResponse>;
    findByCompany(categoriDTO: PlaceDTO): Promise<import("../../shared/utils/IResponse.util").IResponse>;
    findById(IdPlace: any): Promise<import("../../shared/utils/IResponse.util").IResponse>;
}
