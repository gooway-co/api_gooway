"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const categories_module_1 = require("./modules/categories/categories.module");
const places_module_1 = require("./modules/places/places.module");
const mongoose_1 = require("@nestjs/mongoose");
const partners_module_1 = require("./modules/partners/partners.module");
const users_module_1 = require("./modules/users/users.module");
const auth_module_1 = require("./modules/auth/auth.module");
const favorite_module_1 = require("./modules/favorite/favorite.module");
const event_module_1 = require("./modules/event/event.module");
const device_user_module_1 = require("./modules/device-user/device-user.module");
const cities_module_1 = require("./modules/cities/cities.module");
const email_module_1 = require("./modules/email/email.module");
const ENV = process.env.NODE_ENV;
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: !ENV ? '.env.local' : `.env.${ENV}`
            }),
            mongoose_1.MongooseModule.forRoot(`mongodb+srv://simasoftw:HqcrnC4KeJmJiPTj@cluster0.m1lzn0k.mongodb.net/gooway-dev`),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            categories_module_1.CategoriModule,
            places_module_1.PlaceModule,
            partners_module_1.PartnerModule,
            favorite_module_1.FavoriteModule,
            event_module_1.EventModule,
            device_user_module_1.DeviceUserModule,
            cities_module_1.CitiesModule,
            email_module_1.EmailsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map