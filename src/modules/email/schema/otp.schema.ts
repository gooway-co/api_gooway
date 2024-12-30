import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
export type OtpDocument = Otps & Document;

@Schema({
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'update_at'
    }  
})
export class Otps {
 
    @Prop({ required: false })
    @IsNotEmpty()
    code: string; 

    @Prop({ required: true })
    @IsNotEmpty()
    email: string; 

    @Prop({ required: true })
    attempts: number; 

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'users' , required: true })
    @IsNotEmpty()
    idUser: string; 

    @Prop({ required: true })
    @IsNotEmpty()
    status: string; 

    @Prop({
        default: Date.now,
        index: {
            expireAfterSeconds: 300,
        }
    })
    expire: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otps);