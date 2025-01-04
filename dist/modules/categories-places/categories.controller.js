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
exports.CategoriController = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const categories_dto_1 = require("./dtos/categories.dto");
let CategoriController = class CategoriController {
    constructor(_categoriesService) {
        this._categoriesService = _categoriesService;
    }
    async createCategori(CategoryPlaceDTO) {
        console.log("category place");
        return await this._categoriesService.createCategory(CategoryPlaceDTO);
    }
    async updateCompany(CategoryPlaceDTO, IdCategori) {
        return await this._categoriesService.update(CategoryPlaceDTO, IdCategori);
    }
    async deleteCompany(IdCategori) {
        return await this._categoriesService.delete(IdCategori);
    }
    async listar() {
        return await this._categoriesService.listar();
    }
    async findById(IdCategori) {
        return await this._categoriesService.getCategoriById(IdCategori);
    }
};
exports.CategoriController = CategoriController;
__decorate([
    (0, common_1.Post)("/create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [categories_dto_1.CategoryPlaceDTO]),
    __metadata("design:returntype", Promise)
], CategoriController.prototype, "createCategori", null);
__decorate([
    (0, common_1.Put)("/update/:IdCategori"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('IdCategori')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [categories_dto_1.CategoryPlaceDTO, Object]),
    __metadata("design:returntype", Promise)
], CategoriController.prototype, "updateCompany", null);
__decorate([
    (0, common_1.Delete)("/delete/:IdCategori"),
    __param(0, (0, common_1.Param)('IdCategori')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriController.prototype, "deleteCompany", null);
__decorate([
    (0, common_1.Get)("/listar"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)("/findById/:IdCategori"),
    __param(0, (0, common_1.Param)('IdCategori')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CategoriController.prototype, "findById", null);
exports.CategoriController = CategoriController = __decorate([
    (0, common_1.Controller)('categoriesPlaces'),
    __metadata("design:paramtypes", [categories_service_1.CategoriService])
], CategoriController);
//# sourceMappingURL=categories.controller.js.map