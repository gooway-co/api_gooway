import mongoose from "mongoose";
export type CategoriesPlaceDocument = CategoriesPlace & Document;
export declare class CategoriesPlace {
    name: string;
    description: string;
    code: string;
    status: string;
    expire: Date;
}
export declare const CategoriesPlaceSchema: mongoose.Schema<CategoriesPlace, mongoose.Model<CategoriesPlace, any, any, any, mongoose.Document<unknown, any, CategoriesPlace> & CategoriesPlace & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CategoriesPlace, mongoose.Document<unknown, {}, mongoose.FlatRecord<CategoriesPlace>> & mongoose.FlatRecord<CategoriesPlace> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
