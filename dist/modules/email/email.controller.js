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
exports.EmailsController = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
let EmailsController = class EmailsController {
    constructor(emailSevices) {
        this.emailSevices = emailSevices;
    }
    async sendEmailRecoveryPassword(body) {
        let code;
        code = Math.floor(Math.random() * 10000).toString();
        code = ('000' + code).slice(-4);
        return await this.emailSevices.sendEmailWithOTP('Recuperación de Contraseña', '../templates/recuperarClave', { Numero: code }, body);
    }
    async sendPageWeb(body) {
        return await this.emailSevices.sendPageWeb('simasoftw@gmail.com', 'Solicitud Pagina Web', '../templates/templateMail', { name: body.name, email: body.email, message: body.message, phone: body.phone });
    }
    async validateCodeOTP(body, request) {
        return await this.emailSevices.validateCodeOTP(body.code, request);
    }
    async forgottenPassword(body, request) {
        let code;
        code = Math.floor(Math.random() * 10000).toString();
        code = ('000' + code).slice(-4);
        return await this.emailSevices.sendEmailWithOTP('Olvido de Contraseña', '../templates/recuperarClave', { Numero: code }, body);
    }
};
exports.EmailsController = EmailsController;
__decorate([
    (0, common_1.Post)('sendMailRecoveryPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailsController.prototype, "sendEmailRecoveryPassword", null);
__decorate([
    (0, common_1.Post)('sendEmailPageWeb'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmailsController.prototype, "sendPageWeb", null);
__decorate([
    (0, common_1.Post)('validateCodeOTP'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmailsController.prototype, "validateCodeOTP", null);
__decorate([
    (0, common_1.Post)('sendMailRecoveryPassword'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmailsController.prototype, "forgottenPassword", null);
exports.EmailsController = EmailsController = __decorate([
    (0, common_1.Controller)('mail'),
    __metadata("design:paramtypes", [email_service_1.EmailsService])
], EmailsController);
//# sourceMappingURL=email.controller.js.map