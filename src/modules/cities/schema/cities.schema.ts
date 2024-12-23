import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
export type CitiesDocument = Cities & Document;

@Schema({
    timestamps: {
        createdAt: 'create_at',
        updatedAt: 'update_at'
    }  
})
export class Cities {

   
    @Prop({ required: false }) 
    name: string;

    @Prop({ required: false })      
    description: string;
   
}
export const CitiesSchema = SchemaFactory.createForClass(Cities);