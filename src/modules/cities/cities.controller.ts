import { Body, Controller, Post } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CityDto } from './dtos/cities.dto';

@Controller('cities')
export class CitiesController {


    constructor(
        private readonly citiesService: CitiesService
    ){}

    @Post("/filter")
    async createCategori(@Body() cityDto: CityDto) {
        var i = 1;
        console.log(i++);
        return await this.citiesService.getCityByName(cityDto.name);
    }

}
