import { Body, Controller, Get, Param, Post, Delete, Put, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CategoriService } from './categories.service';
import { CategoryPlaceDTO } from './dtos/categories.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';


@Controller('categoriesPlaces')
export class CategoriController {
    constructor(
        private readonly _categoriesService: CategoriService
    ){}

    //@UseGuards(AuthGuard)
    @Post("/create")
    async createCategori(@Body() CategoryPlaceDTO: CategoryPlaceDTO,) {
        console.log("category place");
        return await this._categoriesService.createCategory(CategoryPlaceDTO);
    }

    //@UseGuards(AuthGuard)
    @Put("/update/:IdCategori")
    async updateCompany (@Body() CategoryPlaceDTO: CategoryPlaceDTO,@Param('IdCategori') IdCategori) { 
        return await this._categoriesService.update(CategoryPlaceDTO, IdCategori);
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
