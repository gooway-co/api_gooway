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
exports.CategoryPlaceDTO = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
class CategoryPlaceDTO {
}
exports.CategoryPlaceDTO = CategoryPlaceDTO;
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], CategoryPlaceDTO.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], CategoryPlaceDTO.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CategoryPlaceDTO.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], CategoryPlaceDTO.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], CategoryPlaceDTO.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_1.raw)({
        key: { type: String },
        url: { type: String }
    })),
    __metadata("design:type", Object)
], CategoryPlaceDTO.prototype, "file", void 0);
//# sourceMappingURL=categories.dto.js.map