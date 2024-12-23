import mongoose from "mongoose";
export type DeviceUserDocument = DeviceUser & Document;
export declare class DeviceUser {
    token: string;
}
export declare const DeviceUserSchema: mongoose.Schema<DeviceUser, mongoose.Model<DeviceUser, any, any, any, mongoose.Document<unknown, any, DeviceUser> & DeviceUser & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, DeviceUser, mongoose.Document<unknown, {}, mongoose.FlatRecord<DeviceUser>> & mongoose.FlatRecord<DeviceUser> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
