import { Injectable } from '@nestjs/common';
import { Emails, EmailDocument } from './schema/email.schema';
import { InjectModel } from "@nestjs/mongoose";
import { Model, mongo } from "mongoose";
import { MailerService } from '@nestjs-modules/mailer';
import * as moment from 'moment';
import { AuthService } from '../auth/auth.service';
import { OtpDocument, Otps } from './schema/otp.schema';
import { OtplDTO } from './dtos/otp.dto';
import { User, UserDocument } from '../users/schema/users.schema';

@Injectable()
export class EmailsService {

    constructor(
        @InjectModel(User.name) private usersModel: Model<UserDocument>,
        @InjectModel(Otps.name) private _otpModel: Model<OtpDocument>,

        private readonly mailerService: MailerService,
        private readonly _authService : AuthService
    ) { }

    async sendEmailWithOTP(subject: string, template: string, context: any, body: any) {

        const authResponse = await this.usersModel.findOne({email: body.email});
        console.log(authResponse);
        if(authResponse == null){
            return {
                menssage: "Usuario no encontrado",
                data: [],
                status: 400
            };
        }
        const responseOtp = await this._otpModel.find({idUser:  authResponse._id, status: "INITIAL"});
        console.log(responseOtp);
        
        if(responseOtp.length > 0) {
            return {
                menssage: "Ya enviamos un código a tu correo. Espera el tiempo restante.",
                data: [],
                status: 400
            };
        } 

        context["name"] = authResponse.name;

        let to = authResponse.email;
        let response = await this.mailerService.sendMail({
            to,
            subject,
            template,
            context
        });

        if (!response?.response?.includes('OK')) {
            return {
                menssage: "Error al enviar Correo",
                data: [],
                status: 400
            };
        }

        console.log("context ", context);

        let otplDTO: OtplDTO = new OtplDTO();
        otplDTO.attempts = 0;
        otplDTO.code = context.Numero;
        otplDTO.idUser = authResponse._id;
        otplDTO.email =  authResponse.email;
        otplDTO.status = "INITIAL";

        const responseInsert = new this._otpModel(otplDTO);
        await responseInsert.save();

        return {
            menssage: "Correo Enviado",
            data: [],
            status: 200
        };
    }

    async sendPageWeb(to: string, subject: string, template: string, context: any) {

        let response = await this.mailerService.sendMail({
            to,
            subject,
            template,
            context,
        });

        if (!response?.response?.includes('OK')) {
            return {
                menssage: "Error al enviar Correo",
                data: null,
                status: 400
            };
        }

        return {
            menssage: "Correo Enviado",
            data: [],
            status: 200
        };
    }

    async validateCodeOTP(code: string, request: any) {

        const authResponse = await this._authService.validateUserToken(request);
        const response = await this._otpModel.findOne({  idUser:  new mongo.ObjectId(authResponse._id), status: "INITIAL"});

        if(response == null) {
            return {
                menssage:  "Su código a experido, genere un nuevo código",
                data: [],
                status: 400
            };
        }

        if(response.code == code) {
            const responseUpdate = await this._otpModel.updateOne({ code: code, idUser:  authResponse._id}, {status: "VERIFIED"});
            return {
                menssage: "Código validado con exito",
                data: [responseUpdate],
                status: 200
            };
        } else {

            let contAttempts = response.attempts + 1;
            const responseCodeInvalid = await this._otpModel.updateOne({ idUser:  authResponse._id}, {attempts: contAttempts});
            return {
                menssage: `Código invalidos te quedan ${ 3 - contAttempts}  `,
                data: [],
                status: 200
            };
        }    
    }
}
