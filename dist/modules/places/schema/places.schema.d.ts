import mongoose from "mongoose";
export type PlacesDocument = Places & Document;
export declare class Places {
    description: string;
    name: string;
    imagesUrl: String[];
    longitud: number;
    latitud: number;
    autor?: string;
    openingDate?: string;
    dedication?: string;
    reference: string;
    referencePhoto: string;
    mainTypology?: string;
    secondaryTypology?: string;
    advocacy: string;
    categoryId: string;
    status: string;
    audio: string;
    address: string;
    expire: Date;
}
export declare const PlacesSchema: mongoose.Schema<Places, mongoose.Model<Places, any, any, any, mongoose.Document<unknown, any, Places> & Places & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Places, mongoose.Document<unknown, {}, mongoose.FlatRecord<Places>> & mongoose.FlatRecord<Places> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
