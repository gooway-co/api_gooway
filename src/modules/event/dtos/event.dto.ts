import { Prop } from "@nestjs/mongoose";
import {  IsNotEmpty, IsOptional  } from "class-validator";

export class EventDTO {

    @IsOptional()
    description: string;

    @IsNotEmpty()
    name: string;

    @IsOptional()
    images: any[];

    @IsNotEmpty()
    longitud: number;

    @IsNotEmpty()
    latitud: number;

    @IsOptional()
    autor?: string;

    @IsOptional() 
    openingDate?: Date;

    @IsOptional() 
    endDate?: Date;

    @IsOptional() 
    dedication?: string;

    @IsOptional()
    reference?: string; 

    @IsOptional() 
    invite?: string;


    @IsNotEmpty()
    status: string;

    @IsOptional() 
    address: string;


}
