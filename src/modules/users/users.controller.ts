import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UserDTO } from './dtos/users.dto';
import { Roles } from '../auth/utils/roles.decorador';
import { Role } from '../auth/utils/rol. enum';
import { UsersService } from './users.service';
import { UserAdminDTO } from './dtos/users-admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userSevices: UsersService
    ){}

    @Post("/insertar")
    async insertar(@Body() userDTO: UserDTO) {
        console.log("entro en el controlador ", userDTO)
        return await this.userSevices.insertar(userDTO);
    }

    @Post("/register")
    async register(@Body() userDtoAdmin: UserAdminDTO) {
        return await this.userSevices.registerUserAdmin(userDtoAdmin);
    }


    @UseInterceptors(FileInterceptor('avatar'))
    @Put("/uploadAvatar/:idUsuario")
    async createCategori(@Body() userDTO: UserDTO, @UploadedFile() file: Express.Multer.File, @Param('idUsuario') idUsuario) {
        console.log("data ", userDTO);
        console.log("idUsuario ", idUsuario);
        userDTO.avatar = file;
        return await this.userSevices.uploadAvatar(userDTO, idUsuario);
    }

    @Get('/listById/:idUsuario') 
    async listarPorId(@Param('idUsuario') idUsuario){
        return await this.userSevices.gestClientById(idUsuario) 
    }

    @Put('/actualizar/:idUsuario')
    async actualizar(@Param('idUsuario') idUsuario,  @Body() userDTO: UserDTO) {
       return await this.userSevices.update(userDTO, idUsuario);
    } 
}
