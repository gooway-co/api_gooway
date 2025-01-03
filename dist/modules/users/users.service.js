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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_schema_1 = require("./schema/users.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const status_constant_1 = require("../../shared/utils/status.constant");
const client_s3_1 = require("@aws-sdk/client-s3");
let UsersService = class UsersService {
    constructor(usersModel, s3) {
        this.usersModel = usersModel;
        this.s3 = s3;
        this.bucketName = process.env.AWS_S3_BUCKET_NAME;
    }
    async insertar(userDto) {
        try {
            let email = userDto.email.toLocaleLowerCase().replace(" ", "");
            const responseUser = await this.usersModel.find({ email });
            if (responseUser.length) {
                return {
                    data: [],
                    menssage: `El usuario con correo ${email} ya se encuantra registrado`,
                    status: 400
                };
            }
            userDto.email = email;
            userDto.rol = status_constant_1.CONSTANTS_ROLES.USER;
            userDto.status = status_constant_1.CONSTANTS_STATUS.ACTIVE;
            userDto.phone = "";
            const response = new this.usersModel(userDto);
            await response.save();
            if (response) {
                const filteredResponse = await this.usersModel
                    .findById(response._id)
                    .select('-create_at -update_at -rol -status');
                return {
                    data: [filteredResponse],
                    menssage: "Usuario registrado con exito",
                    status: 200
                };
            }
        }
        catch (error) {
            return {
                data: [],
                menssage: error,
                status: 400
            };
        }
    }
    async update(createUserDTO, idUsuario) {
        const response = await this.usersModel.findByIdAndUpdate(idUsuario, createUserDTO, { new: true });
        if (response?._id) {
            return {
                data: response,
                menssage: "Usuario actualizado con exito",
                status: 200
            };
        }
        else {
            return {
                data: response,
                menssage: "Usuario no encontrado",
                status: 400
            };
        }
    }
    async gestClientById(idUsuario) {
        try {
            const response = await this.usersModel.find({ _id: new mongoose_2.mongo.ObjectId(idUsuario), status: 'ACTIVE' });
            if (response?.length == 0) {
                return {
                    data: response,
                    menssage: "Usuario no encontrado o inactivo",
                    status: 400
                };
            }
            return {
                data: response,
                menssage: "Información usuario",
                status: 200
            };
        }
        catch (error) {
            return {
                data: [],
                menssage: error,
                status: 500
            };
        }
    }
    async registerUserAdmin(userDtoAdmin) {
        try {
            let email = userDtoAdmin.email.toLocaleLowerCase().replace(" ", "");
            userDtoAdmin.rol = "ADMIN";
            userDtoAdmin.status = status_constant_1.CONSTANTS_STATUS.ACTIVE;
            const responseUser = await this.usersModel.find({
                $or: [{ email: userDtoAdmin.email }, { identification: userDtoAdmin.identification }]
            });
            if (responseUser.length) {
                return {
                    data: [],
                    menssage: `El usuario con correo ${email} ya se encuantra registrado`,
                    status: 400
                };
            }
            userDtoAdmin.email = email;
            const response = new this.usersModel(userDtoAdmin);
            await response.save();
            if (response) {
                return {
                    data: [response],
                    menssage: "Usuario registrado con exito",
                    status: 200
                };
            }
        }
        catch (error) {
            return {
                data: [],
                menssage: error.message || "Error al registrar el usuario",
                status: 500
            };
        }
    }
    async uploadAvatar(userDTO, idUsuario) {
        try {
            const response = await this.usersModel.find({ _id: new mongoose_2.mongo.ObjectId(idUsuario), status: 'ACTIVE' });
            if (response.length > 0) {
                const data = await this.uploadImagesToS3(userDTO.avatar, response[0]);
                console.log("data respuesta ", data);
                return {
                    data: [data],
                    menssage: "Imagen de usuario actualizada",
                    status: 200
                };
            }
            return {
                data: [],
                menssage: "Ha ocurido un error al actualizar la imagen de perfi del usuario",
                status: 400
            };
        }
        catch (error) {
            return {
                data: [],
                menssage: error,
                status: 500
            };
        }
    }
    async uploadImagesToS3(file, responseData) {
        const route = `users/${responseData._id}/${file.originalname}`;
        const audioCommand = new client_s3_1.PutObjectCommand({
            Bucket: this.bucketName,
            Key: route,
            Body: file.buffer,
            ContentType: file.mimetype,
        });
        const imagaUrl = await this.s3.send(audioCommand).then((response) => {
            return `https://${this.bucketName}.s3.amazonaws.com/${route}`;
        });
        await Promise.all(imagaUrl);
        const response = await this.usersModel.findOneAndUpdate({ _id: responseData._id }, { avatar: imagaUrl }, { new: true });
        console.log(response);
        return response;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        client_s3_1.S3Client])
], UsersService);
//# sourceMappingURL=users.service.js.map