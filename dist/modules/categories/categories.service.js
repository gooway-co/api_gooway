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
exports.CategoriService = void 0;
const common_1 = require("@nestjs/common");
const categories_schema_1 = require("./schema/categories.schema");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const status_constant_1 = require("../../shared/utils/status.constant");
const client_s3_1 = require("@aws-sdk/client-s3");
let CategoriService = class CategoriService {
    constructor(_categoriesModel, s3) {
        this._categoriesModel = _categoriesModel;
        this.s3 = s3;
        this.bucketName = process.env.AWS_S3_BUCKET_NAME;
    }
    async createCategori(categoriesDTO, file) {
        try {
            categoriesDTO.status = status_constant_1.CONSTANTS_STATUS.ACTIVE;
            const response = await new this._categoriesModel(categoriesDTO);
            response.save();
            if (response) {
                await this.uploadImagesToS3(file, response);
                return {
                    data: response,
                    menssage: "Categoria creada con exito",
                    status: 200
                };
            }
        }
        catch (error) {
            return {
                data: [],
                menssage: error.menssage,
                status: 500
            };
        }
    }
    async update(categoriesDTO, idCategori) {
        const response = await this._categoriesModel.findByIdAndUpdate(idCategori, categoriesDTO, { new: true });
        if (response?._id) {
            return {
                data: response,
                menssage: "Categoria actualizada con exito",
                status: 200
            };
        }
        else {
            return {
                data: response,
                menssage: "Categoria no encontrado",
                status: 400
            };
        }
    }
    async delete(IdCategori) {
        const response = await this._categoriesModel.findByIdAndUpdate(IdCategori, { status: "INACTIVE" }, { new: true });
        ;
        if (response?._id) {
            await this.deleteFolderFromS3(response?._id);
            return {
                data: response,
                menssage: "Categoria eliminado con exito",
                status: 200
            };
        }
        else {
            return {
                data: response,
                menssage: "Categoria no encontrado",
                status: 400
            };
        }
    }
    async listar() {
        const response = await this._categoriesModel.find({ status: "ACTIVE" });
        if (response.length) {
            return {
                data: response,
                menssage: "categorias encontradas",
                status: 200
            };
        }
        else {
            return {
                data: [],
                menssage: "categorias no encontradas",
                status: 400
            };
        }
    }
    async getCategoriById(idCategori) {
        try {
            const response = await this._categoriesModel.findOne({ _id: new mongoose_1.mongo.ObjectId(idCategori), status: 'ACTIVE' });
            if (response == null) {
                return {
                    data: [],
                    menssage: "Categoria no encontrada o inactivo",
                    status: 400
                };
            }
            return {
                data: response,
                menssage: "Categorias encontrados",
                status: 200
            };
        }
        catch (error) {
            return {
                data: [],
                menssage: error,
                status: 400
            };
        }
    }
    async uploadImagesToS3(file, responseData) {
        const audioKey = `category/${responseData._id}/${file.originalname}`;
        const audioCommand = new client_s3_1.PutObjectCommand({
            Bucket: this.bucketName,
            Key: audioKey,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        const imagaUrl = await this.s3.send(audioCommand).then((response) => {
            return `https://${this.bucketName}.s3.amazonaws.com/${audioKey}`;
        });
        await Promise.all(imagaUrl);
        const response = await this._categoriesModel.updateOne({ _id: responseData._id }, { image: imagaUrl });
        return response;
    }
    async deleteFolderFromS3(folderName) {
        try {
            const prefix = `category/${folderName}/`;
            const listParams = {
                Bucket: this.bucketName,
                Prefix: prefix,
            };
            const listedObjects = await this.s3.send(new client_s3_1.ListObjectsV2Command(listParams));
            if (listedObjects.Contents.length === 0) {
                console.log(`No objects found in folder: ${folderName}`);
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
exports.CategoriService = CategoriService;
exports.CategoriService = CategoriService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(categories_schema_1.Categories.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        client_s3_1.S3Client])
], CategoriService);
//# sourceMappingURL=categories.service.js.map