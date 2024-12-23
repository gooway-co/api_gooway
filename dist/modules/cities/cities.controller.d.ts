import { CitiesService } from './cities.service';
import { CityDto } from './dtos/cities.dto';
export declare class CitiesController {
    private readonly citiesService;
    constructor(citiesService: CitiesService);
    createCategori(cityDto: CityDto): Promise<any>;
}
