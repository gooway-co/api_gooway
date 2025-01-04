import { CategoriService } from './categories.service';
import { CategoryPlaceDTO } from './dtos/categories.dto';
export declare class CategoriController {
    private readonly _categoriesService;
    constructor(_categoriesService: CategoriService);
    createCategori(CategoryPlaceDTO: CategoryPlaceDTO): Promise<any>;
    updateCompany(CategoryPlaceDTO: CategoryPlaceDTO, IdCategori: any): Promise<import("../../shared/utils/IResponse.util").IResponse>;
    deleteCompany(IdCategori: any): Promise<import("../../shared/utils/IResponse.util").IResponse>;
    listar(): Promise<any>;
    findById(IdCategori: any): Promise<import("../../shared/utils/IResponse.util").IResponse>;
}
