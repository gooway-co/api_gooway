import { FavoritesDocument } from './schema/favorite.schema';
import { Model } from 'mongoose';
import { FavoriteDTO } from './dtos/favorite.dto';
export declare class FavoriteService {
    private _favoriteModel;
    constructor(_favoriteModel: Model<FavoritesDocument>);
    addFavoritePartner(favoriteDTO: FavoriteDTO): Promise<any>;
    listFavoritePartner(userId: string): Promise<any>;
}
