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
exports.CitiesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cities_schema_1 = require("./schema/cities.schema");
const mongoose_2 = require("mongoose");
let CitiesService = class CitiesService {
    constructor(_citiesModel) {
        this._citiesModel = _citiesModel;
    }
    async getCityByName(filter) {
        try {
            const response = await this._citiesModel.find({
                $or: [
                    { 'cityCapital.name': { $regex: filter, $options: "i" } },
                    { description: { $regex: filter, $options: "i" } },
                ]
            });
            if (response.length > 0) {
                return {
                    data: response,
                    menssage: "Ciudad encontrada",
                    status: 200
                };
            }
            return {
                data: [],
                menssage: "Ciudad no encontrada",
                status: 400
            };
        }
        catch (error) {
            return {
                data: [],
                menssage: error.menssage,
                status: 500
            };
        }
    }
};
exports.CitiesService = CitiesService;
exports.CitiesService = CitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cities_schema_1.Cities.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CitiesService);
//# sourceMappingURL=cities.service.js.map