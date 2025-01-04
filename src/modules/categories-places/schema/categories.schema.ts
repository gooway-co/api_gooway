import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
export type CategoriesPlaceDocument = CategoriesPlace & Document;

@Schema({
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'update_at'
    }  
})
export class CategoriesPlace {

    @Prop({ required: true })
    @IsNotEmpty()
    name: string;


    @Prop({ required: false })
    description: string

    @Prop({ required: true })
    @IsNotEmpty()
    code : string; 
 
    @Prop({ required: true })
    status: string;

    @Prop({
        default: Date.now,
        index: {
            expireAfterSeconds: 259200,
            partialFilterExpression: {
                status: 'INACTIVE'
            }
        }
    })
    expire: Date;
}
export const CategoriesPlaceSchema = SchemaFactory.createForClass(CategoriesPlace);