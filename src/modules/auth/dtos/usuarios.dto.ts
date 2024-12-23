import { Prop } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDTO {

    @Prop({ required: true })
    @IsEmail()
    email: string;

    @Prop({ required: true })
    @IsNotEmpty()
    password: string;

}