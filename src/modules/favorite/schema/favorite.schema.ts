import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
export type FavoritesDocument = Favorites & Document;

@Schema({
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'update_at'
    }  
})
export class Favorites {

   
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true })
    userId: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'partnerts', required: true })
    partnerId: string;

 
}
export const FavoritesSchema = SchemaFactory.createForClass(Favorites);