import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
export type EmailDocument = Emails & Document;

@Schema({
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'update_at'
    }  
})
export class Emails {
 
    @Prop({ required: false })
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

export const EmailSchema = SchemaFactory.createForClass(Emails);