import { CitiesDocument } from './schema/cities.schema';
import { Model } from 'mongoose';
export declare class CitiesService {
    private _citiesModel;
    constructor(_citiesModel: Model<CitiesDocument>);
    getCityByName(filter: String): Promise<any>;
}
