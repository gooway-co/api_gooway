import { Body, Controller, Get, Param, Post, Delete, Put, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CategoriService } from './categories.service';
import { CategoriDTO } from './dtos/categories.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';


@Controller('categoriesPlaces')
export class CategoriController {
    constructor(
        private readonly _categoriesService: CategoriService
    ){}

    //@UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('image'))
    @Post("/create")
    async createCategori(@Body() categoriDTO: CategoriDTO, @UploadedFile() file: Express.Multer.File) {

        categoriDTO.file = file;
        return await this._categoriesService.createCategori(categoriDTO, categoriDTO.file);
    }

    //@UseGuards(AuthGuard)
    @Put("/update/:IdCategori")
    async updateCompany (@Body() categoriDTO: CategoriDTO,@Param('IdCategori') IdCategori) { 
        return await this._categoriesService.update(categoriDTO, IdCategori);
    }

    @Delete("/delete/:IdCategori")
    async deleteCompany (@Param('IdCategori') IdCategori) { 
        return await this._categoriesService.delete(IdCategori);
    }

  
    @Get("/listar")
    async listar () { 
        return await this._categoriesService.listar();
    }

    @Get("/findById/:IdCategori")
    async findById (@Param('IdCategori') IdCategori) { 
        return await this._categoriesService.getCategoriById(IdCategori);
    }
}
