import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export class CityDto {

   
    @Prop({ required: false }) 
    name: string;

    @Prop({ required: false })      
    description: string;
   
}
