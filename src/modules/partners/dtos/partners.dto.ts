import { Prop, raw } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class PartnerDTO {

    @Prop({ required: true, })
    @IsNotEmpty() 
    name: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: false, default: 0 })
    @IsOptional() 
    longitud: number | null;

    @Prop({ required: false, default: 0 })
    @IsOptional() 
    latitud: number | null;

    @Prop({ required: true })
    @IsNotEmpty()
    description: string;

    @Prop({ required: false, default: "ACTIVE" })
    @IsOptional() 
    status: string | null;

    @Prop({ required: true })
    @IsNotEmpty()
    companyId: string;

    @Prop({ required: false, default: 0 })
    @IsOptional() 
    whatsapp: number | null;

    @Prop({ required: false, default: 0 })
    @IsOptional() 
    phone: number | null;

    @Prop({ required: true })
    @IsNotEmpty()
    link: string;

    @Prop({ required: true })
    @IsNotEmpty()
    address: string;

    @Prop({ required: false, default: '' })
    @IsEmail()
    @IsOptional() 
    email: string;

    @Prop({ required: true })
    @IsNotEmpty()
    categoryId: string;

    @Prop({ required: false, default: [] }) // Permite valores opcionales o un array vacío por defecto
    @IsOptional() 
    images: any[]; 
}
