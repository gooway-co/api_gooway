import mongoose from "mongoose";
export type OtpDocument = Otps & Document;
export declare class Otps {
    code: string;
    email: string;
    attempts: number;
    idUser: string;
    status: string;
    expire: Date;
}
export declare const OtpSchema: mongoose.Schema<Otps, mongoose.Model<Otps, any, any, any, mongoose.Document<unknown, any, Otps> & Otps & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Otps, mongoose.Document<unknown, {}, mongoose.FlatRecord<Otps>> & mongoose.FlatRecord<Otps> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
