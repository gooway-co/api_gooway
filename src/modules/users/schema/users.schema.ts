import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsEmail, IsNotEmpty } from "class-validator";
export type UserDocument = User & Document;

@Schema({
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'update_at'
    }  
})
export class User {
    @Prop({ required: true })
    @IsEmail()
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    @IsNotEmpty()
    name: string

    @Prop({ required: true })
    @IsNotEmpty()
    lastName: string

    @Prop({ required: false })
    birthday : Date;

    @Prop({ required: false })
    school : string;

    @Prop({ required: false })
    note : string;

    @Prop({ required: false })
    interests : [];

    @Prop({ required: false })
    musical: string;

    @Prop({ required: false })
    nationality : string;

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    rol: string;

    @Prop({ required: false })
    avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);