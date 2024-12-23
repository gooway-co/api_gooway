import { Prop } from "@nestjs/mongoose";
import {  IsNotEmpty  } from "class-validator";

export class FavoriteDTO {

    @Prop({ required: true })
    @IsNotEmpty()
    userId: string;

    @Prop({ required: true })
    @IsNotEmpty()
    partnerId: string;

}
