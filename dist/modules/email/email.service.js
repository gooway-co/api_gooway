"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mailer_1 = require("@nestjs-modules/mailer");
const auth_service_1 = require("../auth/auth.service");
const otp_schema_1 = require("./schema/otp.schema");
const otp_dto_1 = require("./dtos/otp.dto");
const users_schema_1 = require("../users/schema/users.schema");
let EmailsService = class EmailsService {
    constructor(usersModel, _otpModel, mailerService, _authService) {
        this.usersModel = usersModel;
        this._otpModel = _otpModel;
        this.mailerService = mailerService;
        this._authService = _authService;
    }
    async sendEmailWithOTP(subject, template, context, body) {
        const authResponse = await this.usersModel.findOne({ email: body.email });
        console.log(authResponse);
        if (authResponse == null) {
            return {
                menssage: "Usuario no encontrado",
                data: [],
                status: 400
            };
        }
        const responseOtp = await this._otpModel.find({ idUser: authResponse._id, status: "INITIAL" });
        console.log(responseOtp);
        if (responseOtp.length > 0) {
            console.log("esponseOtp[0]._id ", responseOtp);
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
        let otplDTO = new otp_dto_1.OtplDTO();
        otplDTO.attempts = 0;
        otplDTO.code = context.Numero;
        otplDTO.idUser = authResponse._id;
        otplDTO.email = authResponse.email;
        otplDTO.status = "INITIAL";
        const responseInsert = new this._otpModel(otplDTO);
        await responseInsert.save();
        return {
            menssage: "Correo Enviado",
            data: [{ id: authResponse._id, email: authResponse.email }],
            status: 200
        };
    }
    async sendPageWeb(to, subject, template, context) {
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
    async validateCodeOTP(data) {
        const authResponse = await this.usersModel.findOne({ _id: new mongoose_2.mongo.ObjectId(data.id), status: 'ACTIVE' });
        const response = await this._otpModel.findOne({ idUser: new mongoose_2.mongo.ObjectId(authResponse._id), status: "INITIAL" });
        if (response == null) {
            return {
                menssage: "Su código a experido, genere un nuevo código",
                data: [],
                status: 400
            };
        }
        if (response.code == data.code) {
            const responseUpdate = await this._otpModel.updateOne({ code: data.code, idUser: authResponse._id }, { status: "VERIFIED" });
            return {
                menssage: "Código validado con exito",
                data: [responseUpdate],
                status: 200
            };
        }
        else {
            let contAttempts = response.attempts + 1;
            const responseCodeInvalid = await this._otpModel.updateOne({ idUser: authResponse._id }, { attempts: contAttempts });
            return {
                menssage: `Código invalidos te quedan ${3 - contAttempts} intentos `,
                data: [],
                status: 400
            };
        }
    }
};
exports.EmailsService = EmailsService;
exports.EmailsService = EmailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(otp_schema_1.Otps.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mailer_1.MailerService,
        auth_service_1.AuthService])
], EmailsService);
//# sourceMappingURL=email.service.js.map