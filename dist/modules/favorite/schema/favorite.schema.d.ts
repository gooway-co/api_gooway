import mongoose from "mongoose";
export type FavoritesDocument = Favorites & Document;
export declare class Favorites {
    userId: string;
    partnerId: string;
}
export declare const FavoritesSchema: mongoose.Schema<Favorites, mongoose.Model<Favorites, any, any, any, mongoose.Document<unknown, any, Favorites> & Favorites & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Favorites, mongoose.Document<unknown, {}, mongoose.FlatRecord<Favorites>> & mongoose.FlatRecord<Favorites> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
