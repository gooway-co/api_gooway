import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
export type EventsDocument = Events & Document;

@Schema({
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'update_at'
    }  
})
export class Events {

   
    @Prop({ required: true }) 
    description: string;

    @Prop({ required: true })
    @IsNotEmpty()
    name: string;

    @Prop({ type: [String], required: false })
    imagesUrl: String[]; 

    @Prop({ required: true })
    @IsNotEmpty()
    longitud: number;

    @Prop({ required: true })
    @IsNotEmpty()
    latitud: number;

    @Prop({ required: false }) 
    autor?: string;

    @Prop({required: false }) 
    openingDate?: string; 

    @Prop({required: false }) 
    endDate?: string; 

    @Prop({ required: false }) 
    dedication?: string; 

    @Prop({ required: false }) 
    reference: string; 

    @Prop({ required: false }) 
    invite: string; 

    @Prop({ required: true })
    status: string;



    @Prop({ required: true })
    address: string;

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
export const EventsSchema = SchemaFactory.createForClass(Events);