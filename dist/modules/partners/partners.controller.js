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
exports.PartnerController = void 0;
const common_1 = require("@nestjs/common");
const partners_service_1 = require("./partners.service");
const partners_dto_1 = require("./dtos/partners.dto");
const platform_express_1 = require("@nestjs/platform-express");
let PartnerController = class PartnerController {
    constructor(_partnersService) {
        this._partnersService = _partnersService;
    }
    async createPlace(partnerDTO, files) {
        partnerDTO.images = files;
        try {
            const response = await this._partnersService.createPartner(partnerDTO);
            return response;
        }
        catch (error) {
            console.error('Error al crear el lugar:', error.message);
            return {
                data: [],
                message: 'Error al crear el lugar.',
                status: 500,
            };
        }
    }
    async updateCompany(partnerDTO, IdPartner) {
        return await this._partnersService.update(partnerDTO, IdPartner);
    }
    async deleteCompany(IdPartner) {
        return await this._partnersService.delete(IdPartner);
    }
    async listar() {
        return await this._partnersService.listar();
    }
    async findById(IdPartner) {
        return await this._partnersService.getPartnerById(IdPartner);
    }
    async getPartnerByCategory(categoryId, userId) {
        return await this._partnersService.getPartnerByCategory(categoryId, userId);
    }
    async filterCustomerByUser(data) {
        return await this._partnersService.filterPartnersByCategory(data);
    }
};
exports.PartnerController = PartnerController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [partners_dto_1.PartnerDTO, Array]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "createPlace", null);
__decorate([
    (0, common_1.Post)("/update/:IdPartner"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('IdPartner')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [partners_dto_1.PartnerDTO, Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "updateCompany", null);
__decorate([
    (0, common_1.Post)("/delete/:IdPartner"),
    __param(0, (0, common_1.Param)('IdPartner')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "deleteCompany", null);
__decorate([
    (0, common_1.Post)("/listar"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)("/findById/:IdPartner"),
    __param(0, (0, common_1.Param)('IdPartner')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)("/getPartnerByCategory/:categoryId/:userId?"),
    __param(0, (0, common_1.Param)('categoryId')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "getPartnerByCategory", null);
__decorate([
    (0, common_1.Post)('/filterPartnersByCategory/'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "filterCustomerByUser", null);
exports.PartnerController = PartnerController = __decorate([
    (0, common_1.Controller)('partners'),
    __metadata("design:paramtypes", [partners_service_1.PartnerService])
], PartnerController);
//# sourceMappingURL=partners.controller.js.map