import { Body, Controller, Get, Param, Post, Delete, Put, UseGuards, UploadedFiles, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PlaceService } from './places.service';
import { PlaceDTO } from './dtos/places.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('places')
export class PlaceController {
    constructor(
        private readonly _placesService: PlaceService
    ){}


    @Post('/create')
    @UseInterceptors(FilesInterceptor('images'))
    async createPlace(
        @Body() placeDTO: PlaceDTO,
        @UploadedFiles() files: Express.Multer.File[], 
    ) {

        placeDTO.images = files;

        try {
            const response = await this._placesService.createPlace(placeDTO);
            return response;
        } catch (error) {
            console.error('Error al crear el lugar:', error.message);
            return {
                data: [],
                message: 'Error al crear el lugar.',
                status: 500,
            };
        }
    }

    @Put("/update/:IdPlace")
    async updateCompany (@Body() categoriDTO: PlaceDTO,@Param('IdPlace') IdPlace) { 
        return await this._placesService.update(categoriDTO, IdPlace);
    }

    @Delete("/delete/:IdPlace")
    async deleteCompany (@Param('IdPlace') IdPlace) { 
        return await this._placesService.delete(IdPlace);
    }

    @Get("/listar")
    async findByCompany (@Body() categoriDTO: PlaceDTO) { 
        return await this._placesService.filterPlaceByCompany(categoriDTO);
    }

    @Get("/findById/:IdPlace")
    async findById (@Param('IdPlace') IdPlace) { 
        return await this._placesService.getPlaceById(IdPlace);
    }
}
