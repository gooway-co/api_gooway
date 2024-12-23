import mongoose from "mongoose";
export type PartnersDocument = Partners & Document;
export declare class Partners {
    name: string;
    longitud: number;
    latitud: number;
    imagesUrl: String[];
    description: string;
    status: string;
    whatsapp: number;
    phone: number;
    email: string;
    link: string;
    address: string;
    categoryId: string;
    expire: Date;
}
export declare const PartnersSchema: mongoose.Schema<Partners, mongoose.Model<Partners, any, any, any, mongoose.Document<unknown, any, Partners> & Partners & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Partners, mongoose.Document<unknown, {}, mongoose.FlatRecord<Partners>> & mongoose.FlatRecord<Partners> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
