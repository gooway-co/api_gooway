import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
export type PartnersDocument = Partners & Document;

@Schema({
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'update_at'
    }  
})
export class Partners {

    @Prop({ required: true })
    @IsNotEmpty()
    name: string;

    @Prop({ required: false })
    @IsNotEmpty()
    longitud: number;


    @Prop({ required: false })
    @IsNotEmpty()
    latitud: number;

    @Prop({ type: [String], required: false })
    imagesUrl: String[]; 

    @Prop({ required: true })
    @IsNotEmpty()
    description: string
 
    @Prop({ required: true })
    status: string;

    @Prop({ required: false })
    whatsapp: number;

    @Prop({ required: false })
    phone: number;

    @Prop({ required: false })
    email: string;

    @Prop({ required: false })
    link: string;

    @Prop({ required: false })
    address: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true })
    categoryId: string;

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
export const PartnersSchema = SchemaFactory.createForClass(Partners);