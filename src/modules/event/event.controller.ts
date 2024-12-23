import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { EventsService } from './event.service';
import { EventDTO } from './dtos/event.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('events')
export class EventsController {
    constructor(
        private readonly eventsService: EventsService
    ){}
  

    @Post('/create')
    @UseInterceptors(FilesInterceptor('images'))
    async createPlace(
        @Body() eventDTO: EventDTO,
        @UploadedFiles() files: Express.Multer.File[], 
    ) {

        eventDTO.images = files;

        try {
            const response = await this.eventsService.create(eventDTO);
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
    async updateCompany (@Body() categoriDTO: EventDTO,@Param('IdPlace') IdPlace) { 
        return await this.eventsService.update(categoriDTO, IdPlace);
    }

    @Delete("/delete/:IdPlace")
    async deleteCompany (@Param('IdPlace') IdPlace) { 
        return await this.eventsService.delete(IdPlace);
    }

    @Get("/list")
    async listar () { 
        return await this.eventsService.listar();
    }

    @Get("/findById/:IdPlace")
    async findById (@Param('IdPlace') IdPlace) { 
        return await this.eventsService.getEventById(IdPlace);
    }
   

}
