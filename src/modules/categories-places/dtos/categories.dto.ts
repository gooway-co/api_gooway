import { Prop, raw } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty } from "class-validator";

export class CategoryPlaceDTO {
 
    @Prop({ required: false })
    name: string;

    @Prop({ required: false })
    image: string;

    @Prop({ required: true })
    @IsNotEmpty()
    description: string

    @Prop({ required: false })
    code : string; 

    @Prop({ required: false })
    status: string;

    @Prop(raw({
        key: { type: String },
        url: { type: String }
    }))
    file: Record<string, any>;
}