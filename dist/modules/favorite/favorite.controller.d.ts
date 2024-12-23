import { FavoriteService } from './favorite.service';
import { FavoriteDTO } from './dtos/favorite.dto';
export declare class FavoriteController {
    private readonly favoriteService;
    constructor(favoriteService: FavoriteService);
    addFavoritePartner(favoriteDTO: FavoriteDTO): Promise<any>;
    listarFavoritePartnerByUser(favoriteDTO: FavoriteDTO): Promise<any>;
}
