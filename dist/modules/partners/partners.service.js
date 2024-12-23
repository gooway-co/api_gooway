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
exports.PartnerService = void 0;
const common_1 = require("@nestjs/common");
const partners_schema_1 = require("./schema/partners.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const status_constant_1 = require("../../shared/utils/status.constant");
const client_s3_1 = require("@aws-sdk/client-s3");
let PartnerService = class PartnerService {
    constructor(_partnersModel) {
        this._partnersModel = _partnersModel;
        this.s3 = new client_s3_1.S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
        this.bucketName = process.env.AWS_S3_BUCKET_NAME;
    }
    async createPartner(partnersDTO) {
        try {
            partnersDTO.status = status_constant_1.CONSTANTS_STATUS.ACTIVE;
            const response = await new this._partnersModel(partnersDTO);
            response.save();
            if (response) {
                await this.uploadImagesToS3(partnersDTO.images, response);
                return {
                    data: response,
                    menssage: "Aliado creado con exito",
                    status: 200
                };
            }
        }
        catch (error) {
            return {
                data: [],
                menssage: error.message,
                status: 500
            };
        }
    }
    async update(partnersDTO, idPartner) {
        const response = await this._partnersModel.findByIdAndUpdate(idPartner, partnersDTO, { new: true });
        if (response?._id) {
            return {
                data: response,
                menssage: "Partnera actualizada con exito",
                status: 200
            };
        }
        else {
            return {
                data: response,
                menssage: "Partnera no encontrado",
                status: 400
            };
        }
    }
    async delete(IdPartner) {
        const response = await this._partnersModel.findByIdAndUpdate(IdPartner, { status: "INACTIVE" }, { new: true });
        ;
        if (response?._id) {
            await this.deleteFolderFromS3(response?._id);
            return {
                data: response,
                menssage: "Partnera eliminado con exito",
                status: 200
            };
        }
        else {
            return {
                data: response,
                menssage: "Partnera no encontrado",
                status: 400
            };
        }
    }
    async listar() {
        try {
            const response = await this._partnersModel.find({ status: "ACTIVE" });
            if (response.length) {
                return {
                    data: response,
                    menssage: "Lista de aliados",
                    status: 200
                };
            }
            else {
                return {
                    data: [],
                    menssage: "Aliados no encontrados",
                    status: 400
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
    async getPartnerByCategory(categoryId, userId) {
        try {
            const response = await this._partnersModel.aggregate([
                {
                    $match: {
                        categoryId: new mongoose_1.mongo.ObjectId(categoryId),
                        status: "ACTIVE"
                    }
                },
                {
                    $lookup: {
                        from: "favorites",
                        localField: "_id",
                        foreignField: "partnerId",
                        as: "favorites"
                    }
                },
                {
                    $addFields: {
                        favorite: {
                            $cond: {
                                if: {
                                    $and: [
                                        { $ifNull: [userId, false] },
                                        {
                                            $anyElementTrue: {
                                                $map: {
                                                    input: "$favorites",
                                                    as: "favorite",
                                                    in: {
                                                        $eq: ["$$favorite.userId", userId ? new mongoose_1.mongo.ObjectId(userId) : null]
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                },
                                then: true,
                                else: false
                            }
                        }
                    }
                },
                {
                    $project: {
                        favorites: 0
                    }
                }
            ]);
            if (response.length) {
                return {
                    data: response,
                    menssage: "Lista de aliados por categoría",
                    status: 200
                };
            }
            else {
                return {
                    data: [],
                    menssage: "Aliados no encontrados",
                    status: 400
                };
            }
        }
        catch (error) {
            return {
                data: [],
                menssage: error.message || "Error interno del servidor",
                status: 500
            };
        }
    }
    async getPartnerById(idPartner) {
        try {
            const response = await this._partnersModel.findOne({ _id: new mongoose_1.mongo.ObjectId(idPartner), status: 'ACTIVE' });
            if (response == null) {
                return {
                    data: [],
                    menssage: "Partnera no encontrada o inactivo",
                    status: 400
                };
            }
            return {
                data: response,
                menssage: "Partneras encontrados",
                status: 200
            };
        }
        catch (error) {
            return {
                data: [],
                menssage: error.message,
                status: 400
            };
        }
    }
    async filterPartnersByCategory(body) {
        let textoABuscar = body.text;
        let categoryId = body.categoryId;
        const response = await this._partnersModel.find({ categoryId: categoryId, $and: [
                { name: { $regex: textoABuscar, $options: "i" } },
            ]
        });
        if (response.length) {
            return {
                data: response,
                menssage: "Lista de clientes",
                status: 200
            };
        }
        else {
            return {
                data: [],
                menssage: "clientes no encontrados",
                status: 400
            };
        }
    }
    async uploadImagesToS3(files, responseData) {
        let arrayImages = [];
        if (files == null || files == undefined) {
            return;
        }
        const uploadPromises = files.map((file) => {
            const key = `partners/${responseData._id}/img/${file.originalname}`;
            const command = new client_s3_1.PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            });
            return this.s3.send(command).then((response) => {
                const imageUrl = `https://${this.bucketName}.s3.amazonaws.com/${key}`;
                arrayImages.push(imageUrl);
                return imageUrl;
            });
        });
        arrayImages = await Promise.all(uploadPromises);
        await this._partnersModel.updateOne({ _id: responseData._id }, { imagesUrl: arrayImages });
        arrayImages = [...arrayImages];
        return arrayImages;
    }
    async deleteFolderFromS3(folderName) {
        try {
            const prefix = `partners/${folderName}/`;
            const listParams = {
                Bucket: this.bucketName,
                Prefix: prefix,
            };
            const listedObjects = await this.s3.send(new client_s3_1.ListObjectsV2Command(listParams));
            if (listedObjects.Contents.length === 0) {
                return;
            }
            const objectsToDelete = listedObjects.Contents.map((object) => ({
                Key: object.Key,
            }));
            const deleteParams = {
                Bucket: this.bucketName,
                Delete: {
                    Objects: objectsToDelete,
                },
            };
            const deleteResponse = await this.s3.send(new client_s3_1.DeleteObjectsCommand(deleteParams));
            if (listedObjects.Contents?.length === 0) {
                const deleteDirectoryCommand = new client_s3_1.DeleteObjectCommand({
                    Bucket: this.bucketName,
                    Key: prefix,
                });
                await this.s3.send(deleteDirectoryCommand);
            }
        }
        catch (error) {
            console.error('Error deleting folder:', error);
        }
    }
};
exports.PartnerService = PartnerService;
exports.PartnerService = PartnerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(partners_schema_1.Partners.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PartnerService);
//# sourceMappingURL=partners.service.js.map