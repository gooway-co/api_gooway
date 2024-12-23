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
exports.DeviceUserController = void 0;
const common_1 = require("@nestjs/common");
const device_user_service_1 = require("./device-user.service");
const device_user_dto_1 = require("./dto/device-user.dto");
const send_notification_dto_1 = require("./dto/send-notification.dto");
let DeviceUserController = class DeviceUserController {
    constructor(_deviceUserService) {
        this._deviceUserService = _deviceUserService;
    }
    async saveTokenDevice(deviceUserDto) {
        return await this._deviceUserService.saveInfoDeviceUser(deviceUserDto);
    }
    async sendNotification(sentNotificationDto) {
        return await this._deviceUserService.sendNotificationDevice(sentNotificationDto);
    }
};
exports.DeviceUserController = DeviceUserController;
__decorate([
    (0, common_1.Post)("/create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [device_user_dto_1.DeviceUserDto]),
    __metadata("design:returntype", Promise)
], DeviceUserController.prototype, "saveTokenDevice", null);
__decorate([
    (0, common_1.Post)("/sendNotification"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_notification_dto_1.SentNotificationDeviceDto]),
    __metadata("design:returntype", Promise)
], DeviceUserController.prototype, "sendNotification", null);
exports.DeviceUserController = DeviceUserController = __decorate([
    (0, common_1.Controller)('device'),
    __metadata("design:paramtypes", [device_user_service_1.DeviceUserService])
], DeviceUserController);
//# sourceMappingURL=device-user.controller.js.map