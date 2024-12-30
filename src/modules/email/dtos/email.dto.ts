import { Prop } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty } from "class-validator";

export class EmailDTO {
 
    @Prop({ required: true })
    @IsNotEmpty()
    code: string; 

    @Prop({ required: true })
    @IsNotEmpty()
    email: string; 

    @Prop({ required: true })
    date: Date; 

    @Prop({ required: true })
    Attempts: number; 
}