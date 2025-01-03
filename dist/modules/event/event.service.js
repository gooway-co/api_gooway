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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const status_constant_1 = require("../../shared/utils/status.constant");
const client_s3_1 = require("@aws-sdk/client-s3");
const event_schema_1 = require("./schema/event.schema");
let EventsService = class EventsService {
    constructor(_eventModel) {
        this._eventModel = _eventModel;
        this.s3 = new client_s3_1.S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
        this.bucketName = process.env.AWS_S3_BUCKET_NAME;
    }
    async create(eventDTO) {
        try {
            eventDTO['status'] = status_constant_1.CONSTANTS_STATUS.ACTIVE;
            const response = await new this._eventModel(eventDTO);
            response.save();
            if (eventDTO.images &&
                Array.isArray(eventDTO.images) &&
                eventDTO.images.length > 0) {
                await this.uploadImagesToS3(eventDTO.images, response);
            }
            if (response) {
                return {
                    data: response,
                    menssage: 'Evento creada con exito',
                    status: 200,
                };
            }
        }
        catch (error) {
            return {
                data: [],
                message: error.message,
                status: 500,
            };
        }
    }
    async update(eventDTO, idPlace) {
        const response = await this._eventModel.findByIdAndUpdate(idPlace, eventDTO, { new: true });
        if (response?._id) {
            return {
                data: response,
                menssage: 'Evento actualizada con exito',
                status: 200,
            };
        }
        else {
            return {
                data: response,
                menssage: 'Evento no encontrado',
                status: 400,
            };
        }
    }
    async delete(IdPlace) {
        const response = await this._eventModel.findByIdAndUpdate(IdPlace, { status: 'INACTIVE' }, { new: true });
        if (response?._id) {
            await this.deleteFolderFromS3(IdPlace);
            return {
                data: response,
                menssage: 'Evento eliminado con exito',
                status: 200,
            };
        }
        else {
            return {
                data: response,
                menssage: 'Evento no encontrado',
                status: 400,
            };
        }
    }
    async listar() {
        try {
            const response = await this._eventModel.find({
                status: 'ACTIVE',
            }).sort({ create_at: -1 });
            if (response.length) {
                return {
                    data: response,
                    menssage: 'Lista de Evento',
                    status: 200,
                };
            }
            else {
                return {
                    data: [],
                    menssage: 'Evento no encontrados',
                    status: 400,
                };
            }
        }
        catch (error) {
            return {
                data: [],
                menssage: error.message,
                status: 500,
            };
        }
    }
    async getEventById(idPlace) {
        try {
            const response = await this._eventModel.findOne({
                _id: new mongoose_1.mongo.ObjectId(idPlace),
                status: 'ACTIVE',
            });
            if (response == null) {
                return {
                    data: [],
                    menssage: 'Evento no encontrada o inactivo',
                    status: 400,
                };
            }
            return {
                data: response,
                menssage: 'Eventos encontrados',
                status: 200,
            };
        }
        catch (error) {
            return {
                data: [],
                menssage: error,
                status: 400,
            };
        }
    }
    async uploadImagesToS3(files, responseData) {
        let arrayImages = [];
        const uploadPromises = files.map((file) => {
            const key = `event/${responseData._id}/img/${file.originalname}`;
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
        await this._eventModel.updateOne({ _id: responseData._id }, { imagesUrl: arrayImages });
        arrayImages = [...arrayImages];
        return arrayImages;
    }
    convertBase64ToBuffer(base64String, originalname, mimetype) {
        const base64Data = base64String.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');
        return {
            fieldname: 'images',
            originalname: originalname,
            encoding: '7bit',
            mimetype: mimetype,
            buffer: buffer,
            size: buffer.length
        };
    }
    async deleteFolderFromS3(folderName) {
        try {
            const prefix = `places/${folderName}/`;
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
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(event_schema_1.Events.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], EventsService);
//# sourceMappingURL=event.service.js.map