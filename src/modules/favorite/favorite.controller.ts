import { Body, Controller, Post } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteDTO } from './dtos/favorite.dto';

@Controller('favorite')
export class FavoriteController {
    constructor(
        private readonly favoriteService: FavoriteService
    ){}

    @Post('/add')
    async addFavoritePartner(
        @Body() favoriteDTO: FavoriteDTO,
    ){
        console.log("datos ",favoriteDTO );
        return await this.favoriteService.addFavoritePartner(favoriteDTO);
    }

    @Post('/lista')
    async listarFavoritePartnerByUser(
        @Body() favoriteDTO: FavoriteDTO,
    ){
        return await this.favoriteService.listFavoritePartner(favoriteDTO.userId)
    }

}
