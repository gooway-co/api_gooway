"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const email_schema_1 = require("./schema/email.schema");
const email_controller_1 = require("./email.controller");
const email_service_1 = require("./email.service");
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const auth_service_1 = require("../auth/auth.service");
const users_schema_1 = require("../users/schema/users.schema");
const otp_schema_1 = require("./schema/otp.schema");
let EmailsModule = class EmailsModule {
};
exports.EmailsModule = EmailsModule;
exports.EmailsModule = EmailsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: 'frainer2013@gmail.com',
                        pass: 'cdwzptywvwmxglhh',
                    },
                },
                template: {
                    dir: process.cwd() + '/src/modules/email/templates',
                    adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
            mongoose_1.MongooseModule.forFeature([{ name: email_schema_1.Emails.name, schema: email_schema_1.EmailSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: users_schema_1.User.name, schema: users_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forFeature([{ name: otp_schema_1.Otps.name, schema: otp_schema_1.OtpSchema }])
        ],
        controllers: [email_controller_1.EmailsController],
        providers: [email_service_1.EmailsService, auth_service_1.AuthService]
    })
], EmailsModule);
//# sourceMappingURL=email.module.js.map