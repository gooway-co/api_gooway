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
exports.CategoriesSchema = exports.Categories = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
let Categories = class Categories {
};
exports.Categories = Categories;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Categories.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Categories.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", String)
], Categories.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Categories.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Categories.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: Date.now,
        index: {
            expireAfterSeconds: 259200,
            partialFilterExpression: {
                status: 'INACTIVE'
            }
        }
    }),
    __metadata("design:type", Date)
], Categories.prototype, "expire", void 0);
exports.Categories = Categories = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: {
            createdAt: 'create_at',
            updatedAt: 'update_at'
        }
    })
], Categories);
exports.CategoriesSchema = mongoose_1.SchemaFactory.createForClass(Categories);
//# sourceMappingURL=categories.schema.js.map