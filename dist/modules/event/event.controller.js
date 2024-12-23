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
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const event_service_1 = require("./event.service");
const event_dto_1 = require("./dtos/event.dto");
const platform_express_1 = require("@nestjs/platform-express");
let EventsController = class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    async createPlace(eventDTO, files) {
        eventDTO.images = files;
        try {
            const response = await this.eventsService.create(eventDTO);
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
    async updateCompany(categoriDTO, IdPlace) {
        return await this.eventsService.update(categoriDTO, IdPlace);
    }
    async deleteCompany(IdPlace) {
        return await this.eventsService.delete(IdPlace);
    }
    async listar() {
        return await this.eventsService.listar();
    }
    async findById(IdPlace) {
        return await this.eventsService.getEventById(IdPlace);
    }
};
exports.EventsController = EventsController;
__decorate([
    (0, common_1.Post)('/create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('images')),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_dto_1.EventDTO, Array]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "createPlace", null);
__decorate([
    (0, common_1.Put)("/update/:IdPlace"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('IdPlace')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_dto_1.EventDTO, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "updateCompany", null);
__decorate([
    (0, common_1.Delete)("/delete/:IdPlace"),
    __param(0, (0, common_1.Param)('IdPlace')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "deleteCompany", null);
__decorate([
    (0, common_1.Get)("/list"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "listar", null);
__decorate([
    (0, common_1.Get)("/findById/:IdPlace"),
    __param(0, (0, common_1.Param)('IdPlace')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "findById", null);
exports.EventsController = EventsController = __decorate([
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [event_service_1.EventsService])
], EventsController);
//# sourceMappingURL=event.controller.js.map