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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_dto_1 = require("./dtos/users.dto");
const users_service_1 = require("./users.service");
const users_admin_dto_1 = require("./dtos/users-admin.dto");
const platform_express_1 = require("@nestjs/platform-express");
let UsersController = class UsersController {
    constructor(userSevices) {
        this.userSevices = userSevices;
    }
    async insertar(userDTO) {
        console.log("entro en el controlador ", userDTO);
        return await this.userSevices.insertar(userDTO);
    }
    async register(userDtoAdmin) {
        return await this.userSevices.registerUserAdmin(userDtoAdmin);
    }
    async createCategori(userDTO, file, idUsuario) {
        userDTO.avatar = file;
        return await this.userSevices.uploadAvatar(userDTO, idUsuario);
    }
    async listarPorId(idUsuario) {
        return await this.userSevices.gestClientById(idUsuario);
    }
    async actualizar(idUsuario, userDTO) {
        return await this.userSevices.update(userDTO, idUsuario);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)("/insertar"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "insertar", null);
__decorate([
    (0, common_1.Post)("/register"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_admin_dto_1.UserAdminDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    (0, common_1.Put)("/uploadAvatar/:idUsuario"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Param)('idUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UserDTO, Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createCategori", null);
__decorate([
    (0, common_1.Get)('/listById/:idUsuario'),
    __param(0, (0, common_1.Param)('idUsuario')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "listarPorId", null);
__decorate([
    (0, common_1.Put)('/actualizar/:idUsuario'),
    __param(0, (0, common_1.Param)('idUsuario')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_dto_1.UserDTO]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "actualizar", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map