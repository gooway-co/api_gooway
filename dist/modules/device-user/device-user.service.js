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
exports.DeviceUserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const device_user_schema_1 = require("./schema/device-user.schema");
const mongoose_2 = require("mongoose");
const axios = require('axios');
const admin = require("firebase-admin");
let DeviceUserService = class DeviceUserService {
    constructor(_deviceUserModel, firebaseApp) {
        this._deviceUserModel = _deviceUserModel;
        this.firebaseApp = firebaseApp;
    }
    async saveInfoDeviceUser(deviceUserDto) {
        try {
            const tokenExist = await this._deviceUserModel.findOne({ "token": deviceUserDto.token });
            if (tokenExist) {
                return {
                    data: [],
                    menssage: "El token ya existe",
                    status: 500
                };
            }
            const response = await new this._deviceUserModel(deviceUserDto);
            response.save();
            if (response) {
                return {
                    data: response,
                    menssage: "Información guardada con exito",
                    status: 200
                };
            }
        }
        catch (error) {
            return {
                data: [],
                menssage: error,
                status: 500
            };
        }
    }
    async sendNotificationDevice(sentNotificationDto) {
        try {
            const tokenExist = await this._deviceUserModel.find({});
            console.log("tokenExist ", tokenExist);
            if (tokenExist.length > 0) {
                console.log("entro en el ", tokenExist);
                for (const element of tokenExist) {
                    const message = {
                        token: element.token,
                        notification: {
                            title: sentNotificationDto.title,
                            body: sentNotificationDto.body,
                        },
                        data: {},
                    };
                    const response = await this.firebaseApp.messaging().send(message);
                    console.log("response notification ", response);
                }
                return {
                    data: [],
                    message: "Notificaciones no enviadas",
                    status: 400
                };
            }
            return {
                data: [],
                message: "No se ha encontrado token para enviar notificaciones",
                status: 400
            };
        }
        catch (error) {
            return {
                data: [],
                message: error,
                status: 500
            };
        }
    }
};
exports.DeviceUserService = DeviceUserService;
exports.DeviceUserService = DeviceUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(device_user_schema_1.DeviceUser.name)),
    __param(1, (0, common_1.Inject)('FIREBASE_APP')),
    __metadata("design:paramtypes", [mongoose_2.Model, Object])
], DeviceUserService);
//# sourceMappingURL=device-user.service.js.map