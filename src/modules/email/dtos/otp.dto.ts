import { Prop } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
import { Types } from "mongoose";

export class OtplDTO {
 
    @Prop({ required: true })
    @IsNotEmpty()
    code: string; 

    @Prop({ required: true })
    @IsNotEmpty()
    @IsEmail()
    email: string; 

    @Prop({ required: true })
    attempts: number; 

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    @IsNotEmpty()
    idUser: Types.ObjectId;

    @Prop({ required: true })
    @IsNotEmpty()
    status: string;
}