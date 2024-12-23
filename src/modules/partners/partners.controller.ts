import { Body, Controller, Get, Param, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { PartnerService } from './partners.service';
import { PartnerDTO } from './dtos/partners.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('partners')
export class PartnerController {
    constructor(
        private readonly _partnersService: PartnerService
    ){}


    //@UseGuards(AuthGuard)
    @Post('/create')
    @UseInterceptors(FilesInterceptor('images'))
    async createPlace(
        @Body() partnerDTO: PartnerDTO,
        @UploadedFiles() files: Express.Multer.File[], 
    ) {

        partnerDTO.images = files;

        try {
            const response = await this._partnersService.createPartner(partnerDTO);
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

    //@UseGuards(AuthGuard)
    @Post("/update/:IdPartner")
    async updateCompany (@Body() partnerDTO: PartnerDTO,@Param('IdPartner') IdPartner) { 
        return await this._partnersService.update(partnerDTO, IdPartner);
    }

    //@UseGuards(AuthGuard)
    @Post("/delete/:IdPartner")
    async deleteCompany (@Param('IdPartner') IdPartner) { 
        return await this._partnersService.delete(IdPartner);
    }

    @Post("/listar")
    async listar () { 
        return await this._partnersService.listar();
    }

    @Get("/findById/:IdPartner")
    async findById (@Param('IdPartner') IdPartner) { 
        return await this._partnersService.getPartnerById(IdPartner);
    }


    @Get("/getPartnerByCategory/:categoryId/:userId?")
    async getPartnerByCategory(
        @Param('categoryId') categoryId: string, 
        @Param('userId') userId?: string // userId es opcional
    ) { 
        return await this._partnersService.getPartnerByCategory(categoryId, userId);
    }
    

    @Post('/filterPartnersByCategory/') 
    async filterCustomerByUser(@Body() data){
        return await this._partnersService.filterPartnersByCategory(data) 
    }
}
