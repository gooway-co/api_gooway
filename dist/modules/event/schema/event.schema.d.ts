import mongoose from "mongoose";
export type EventsDocument = Events & Document;
export declare class Events {
    description: string;
    name: string;
    imagesUrl: String[];
    longitud: number;
    latitud: number;
    autor?: string;
    openingDate?: string;
    endDate?: string;
    dedication?: string;
    reference: string;
    invite: string;
    status: string;
    address: string;
    expire: Date;
}
export declare const EventsSchema: mongoose.Schema<Events, mongoose.Model<Events, any, any, any, mongoose.Document<unknown, any, Events> & Events & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Events, mongoose.Document<unknown, {}, mongoose.FlatRecord<Events>> & mongoose.FlatRecord<Events> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
