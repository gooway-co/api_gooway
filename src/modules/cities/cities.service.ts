import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cities, CitiesDocument } from './schema/cities.schema';
import { Model } from 'mongoose';

@Injectable()
export class CitiesService {


    constructor(
        @InjectModel(Cities.name)
        private _citiesModel: Model<CitiesDocument>,
    ){}

    async getCityByName(filter: String):Promise<any> {

        try {
            const response = await this._citiesModel.find({
                $or: [
                  { 'cityCapital.name': { $regex: filter, $options: "i" } },
                  { description: { $regex: filter, $options: "i" } },
                ]
              }
            );

            if(response.length > 0) {
                return {
                    data: response,
                    menssage: "Ciudad encontrada",
                    status: 200
                }
            }
            return {
                data: [],
                menssage: "Ciudad no encontrada",
                status: 400
            }

        } catch(error){
            return {
                data: [],
                menssage: error.menssage,
                status: 500
            }
        }
    }

}
