import mongoose from "mongoose";
export type EmailDocument = Emails & Document;
export declare class Emails {
    code: string;
    email: string;
    date: Date;
    Attempts: number;
}
export declare const EmailSchema: mongoose.Schema<Emails, mongoose.Model<Emails, any, any, any, mongoose.Document<unknown, any, Emails> & Emails & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Emails, mongoose.Document<unknown, {}, mongoose.FlatRecord<Emails>> & mongoose.FlatRecord<Emails> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
