import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dtos/usuarios.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @Post('/login')
    async createPost(@Body() authDTO: AuthDTO){
        return await this.authService.login(authDTO);
    }
}
