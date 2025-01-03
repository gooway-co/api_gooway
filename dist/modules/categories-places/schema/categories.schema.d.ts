import mongoose from "mongoose";
export type CategoriesDocument = Categories & Document;
export declare class Categories {
    name: string;
    image: string;
    description: string;
    code: string;
    status: string;
    expire: Date;
}
export declare const CategoriesSchema: mongoose.Schema<Categories, mongoose.Model<Categories, any, any, any, mongoose.Document<unknown, any, Categories> & Categories & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Categories, mongoose.Document<unknown, {}, mongoose.FlatRecord<Categories>> & mongoose.FlatRecord<Categories> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
