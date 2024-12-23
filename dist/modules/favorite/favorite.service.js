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
exports.FavoriteService = void 0;
const common_1 = require("@nestjs/common");
const favorite_schema_1 = require("./schema/favorite.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let FavoriteService = class FavoriteService {
    constructor(_favoriteModel) {
        this._favoriteModel = _favoriteModel;
    }
    async addFavoritePartner(favoriteDTO) {
        try {
            const responsePartner = await this._favoriteModel.findOne({ partnerId: new mongoose_2.mongo.ObjectId(favoriteDTO.partnerId) });
            if (responsePartner) {
                const responsePartner = await this._favoriteModel.deleteOne({ partnerId: new mongoose_2.mongo.ObjectId(favoriteDTO.partnerId) });
                return {
                    data: [responsePartner],
                    menssage: 'Eliminastes el negocio de tus favoritos',
                    status: 204,
                };
            }
            const response = await new this._favoriteModel(favoriteDTO);
            response.save();
            console.log("responsePartner ", response);
            return {
                data: [response],
                menssage: '',
                status: 200,
            };
        }
        catch (error) {
            return {
                data: [],
                menssage: error,
                status: 500,
            };
        }
    }
    async listFavoritePartner(userId) {
        try {
            const response = await this._favoriteModel.aggregate([
                {
                    $match: { userId: new mongoose_2.mongo.ObjectId(userId) },
                },
                {
                    $lookup: {
                        from: 'partners',
                        localField: 'partnerId',
                        foreignField: '_id',
                        as: 'partnerDetails',
                    },
                },
                {
                    $unwind: '$partnerDetails',
                },
                {
                    $addFields: {
                        'partnerDetails.favorite': true,
                    },
                },
                {
                    $project: {
                        _id: 1,
                        userId: 1,
                        partnerId: 1,
                        partnerDetails: {
                            _id: 1,
                            name: 1,
                            longitud: 1,
                            latitud: 1,
                            imagesUrl: 1,
                            description: 1,
                            status: 1,
                            whatsapp: 1,
                            phone: 1,
                            email: 1,
                            link: 1,
                            address: 1,
                            categoryId: 1,
                            favorite: 1,
                        },
                    },
                },
            ]);
            return {
                data: response.map(item => ({
                    favoriteId: item._id,
                    partner: item.partnerDetails,
                })),
                message: "Favoritos obtenidos",
                status: 200,
            };
        }
        catch (error) {
            return {
                data: [],
                message: `Error obteniendo favoritos: ${error.message}`,
                status: 500,
            };
        }
    }
};
exports.FavoriteService = FavoriteService;
exports.FavoriteService = FavoriteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(favorite_schema_1.Favorites.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FavoriteService);
//# sourceMappingURL=favorite.service.js.map