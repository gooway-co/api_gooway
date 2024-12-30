import { Types } from "mongoose";
export declare class OtplDTO {
    code: string;
    email: string;
    attempts: number;
    idUser: Types.ObjectId;
    status: string;
}
