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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerDTO = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
class PartnerDTO {
}
exports.PartnerDTO = PartnerDTO;
__decorate([
    (0, mongoose_1.Prop)({ required: true, }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PartnerDTO.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], PartnerDTO.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PartnerDTO.prototype, "longitud", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PartnerDTO.prototype, "latitud", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PartnerDTO.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: "ACTIVE" }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PartnerDTO.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PartnerDTO.prototype, "companyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PartnerDTO.prototype, "whatsapp", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: 0 }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PartnerDTO.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PartnerDTO.prototype, "link", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PartnerDTO.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: '' }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PartnerDTO.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PartnerDTO.prototype, "categoryId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, default: [] }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], PartnerDTO.prototype, "images", void 0);
//# sourceMappingURL=partners.dto.js.map