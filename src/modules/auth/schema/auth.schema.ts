import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty } from "class-validator";
export type AuthDocument = Auth & Document;

@Schema({
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'update_at'
    }  
})
export class Auth {
    @Prop({ required: true })
    @IsEmail()
    email: string;

    @Prop({ required: true })
    @IsNotEmpty()
    password: string;

}

export const AuthSchema = SchemaFactory.createForClass(Auth);