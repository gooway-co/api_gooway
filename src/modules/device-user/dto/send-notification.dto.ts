import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import { Schema as MongooseSchema } from "mongoose";

@Schema({
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'update_at'
    }  
})
export class SentNotificationDeviceDto {

    @Prop({ required: true })
    @IsNotEmpty()
    token: string;

    @Prop({ required: true })
    @IsNotEmpty()
    title: string;


    @Prop({ required: true })
    @IsNotEmpty()
    body: string;

    @Prop({ required: false, type: MongooseSchema.Types.Mixed })
    data: Record<string, any>; 
 
}