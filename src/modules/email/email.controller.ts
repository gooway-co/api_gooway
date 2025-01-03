import { Body, Controller, Delete, Get, Param, Post, Put, Request } from '@nestjs/common';
import { EmailDTO } from './dtos/email.dto';
import { EmailsService } from './email.service';

@Controller('mail')
export class EmailsController {

    constructor(
        private readonly emailSevices: EmailsService
    ){}

    @Post('sendMailRecoveryPassword')
    async sendEmailRecoveryPassword(@Body() body) {  
        let code: string; 
        code = Math.floor(Math.random() * 10000).toString()
        code = ('000' + code).slice(-4);
    
        return await this.emailSevices.sendEmailWithOTP(
            'Recuperación de Contraseña',
            '../templates/recuperarClave', // Nombre de la plantilla de correo (archivo welcome.hbs dentro de la carpeta templates)
            { Numero: code}, // Contexto de la plantilla
            body,
        ); 
    }

    @Post('sendEmailPageWeb')
    async sendPageWeb(@Body() body) {  
        return await this.emailSevices.sendPageWeb(
            'simasoftw@gmail.com',
            'Solicitud Pagina Web',
            '../templates/templateMail', // Nombre de la plantilla de correo (archivo welcome.hbs dentro de la carpeta templates)
            { name: body.name, email: body.email, message: body.message, phone: body.phone}, // Contexto de la plantilla
        ); 
    }

    @Post('validateCodeOTP')
    async validateCodeOTP(@Body() body) {  
        console.log("estro en validateCodeOTP"); 
        return await this.emailSevices.validateCodeOTP(body); 
    }


    @Post('sendMailRecoveryPassword')
    async forgottenPassword(@Body() body, @Request() request) {  
        let code: string; 
        code = Math.floor(Math.random() * 10000).toString()
        code = ('000' + code).slice(-4);
    
        return await this.emailSevices.sendEmailWithOTP(
            'Olvido de Contraseña',
            '../templates/recuperarClave', // Nombre de la plantilla de correo (archivo welcome.hbs dentro de la carpeta templates)
            { Numero: code}, // Contexto de la plantilla
            body,
            
        ); 
    }

}
