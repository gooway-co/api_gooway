import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
export type DeviceUserDocument = DeviceUser & Document;

@Schema({
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'update_at'
    }  
})
export class DeviceUser {

    @Prop({ required: true })
    @IsNotEmpty()
    token: string;
 
}
export const DeviceUserSchema = SchemaFactory.createForClass(DeviceUser);