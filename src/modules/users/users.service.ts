import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schema/users.schema';
import { UserDTO } from './dtos/users.dto';
import { IResponse } from '../../shared/utils/IResponse.util';
import { InjectModel } from "@nestjs/mongoose";
import { Model, mongo } from "mongoose";
import { CONSTANTS_ROLES, CONSTANTS_STATUS } from 'src/shared/utils/status.constant';
import { UserAdminDTO } from './dtos/users-admin.dto';
import {
    S3Client,
    PutObjectCommand,
    ListObjectsV2Command,
    DeleteObjectCommand,
    DeleteObjectsCommand,
} from '@aws-sdk/client-s3';

@Injectable()
export class UsersService {

    private readonly bucketName: string;

    constructor(
        @InjectModel(User.name) private usersModel: Model<UserDocument>,
        private readonly s3: S3Client,
    ) { 
        this.bucketName = process.env.AWS_S3_BUCKET_NAME;
    }

    async insertar(userDto: UserDTO): Promise<IResponse> {
        try {

            let email = userDto.email.toLocaleLowerCase().replace(" ", "");

            const responseUser = await this.usersModel.find({ email });

            if (responseUser.length) {
                return {
                    data: [],
                    menssage: `El usuario con correo ${email} ya se encuantra registrado`,
                    status: 400
                }
            }

            userDto.email = email;
            userDto.rol = CONSTANTS_ROLES.USER;
            userDto.status = CONSTANTS_STATUS.ACTIVE;
            userDto.phone = "";

            const response = new this.usersModel(userDto);
            await response.save();


            if (response) {

                const filteredResponse = await this.usersModel
                .findById(response._id)
                .select('-create_at -update_at -rol -status');

                console.log("filteredResponse ", filteredResponse);

                return {
                    data: filteredResponse,
                    menssage: "Usuario registrado con exito",
                    status: 200
                }
            }

        } catch (error) {
            return {
                data: [],
                menssage: error,
                status: 400
            }
        }
    }

    async update(createUserDTO: UserDTO, idUsuario): Promise<IResponse> {
        const response = await this.usersModel.findByIdAndUpdate(idUsuario,
            createUserDTO, { new: true });
        if (response?._id) {
            return {
                data: response,
                menssage: "Usuario actualizado con exito",
                status: 200
            }
        } else {
            return {
                data: response,
                menssage: "Usuario no encontrado",
                status: 400
            }
        }
    }

    async gestClientById(idUsuario: string): Promise<IResponse> {
        try {
            const response = await this.usersModel.find({ _id: new mongo.ObjectId(idUsuario), status: 'ACTIVE' });
            
            if (response?.length == 0) {
                return {
                    data: response,
                    menssage: "Usuario no encontrado o inactivo",
                    status: 400
                }
            } 

            return {
                data: response,
                menssage: "Información usuario",
                status: 200
            }

        } catch (error) {
            return {
                data: [],
                menssage: error,
                status: 500
            }
        }
    }

    async registerUserAdmin(userDtoAdmin: UserAdminDTO): Promise<IResponse> {
        try {

            let email = userDtoAdmin.email.toLocaleLowerCase().replace(" ", "");
    
            userDtoAdmin.rol = "ADMIN";
            userDtoAdmin.status = CONSTANTS_STATUS.ACTIVE;

            const responseUser = await this.usersModel.find({
                $or: [{ email:  userDtoAdmin.email}, { identification: userDtoAdmin.identification }]
            });


            if (responseUser.length) {
                return {
                    data: [],
                    menssage: `El usuario con correo ${email} ya se encuantra registrado`,
                    status: 400
                }
            }

            /*const responseBalance = await this._balanceSheetsService.createBalance(responseCompany.data._id);
        
            if (responseBalance.status != 200) {
                return {
                    data: [],
                    menssage: "Error al crear balance",
                    status: 400
                }
            }*/

            userDtoAdmin.email = email;
            const response = new this.usersModel(userDtoAdmin);
            await response.save();

            if (response) {
                return {
                    data: [response],
                    menssage: "Usuario registrado con exito",
                    status: 200
                }
            }

        } catch (error) {
            return {
                data: [],
                menssage: error.message || "Error al registrar el usuario",
                status: 500
            }
        }
    }


    async uploadAvatar(userDTO: UserDTO, idUsuario: string) :Promise<any> {

        try {

            const response = await this.usersModel.find({ _id: new mongo.ObjectId(idUsuario), status: 'ACTIVE' });

            if(response.length > 0) {
                const data = await this.uploadImagesToS3(userDTO.avatar, response[0]);
                console.log("data respuesta " , data)

                return {
                    data: [data],
                    menssage: "Imagen de usuario actualizada",
                    status: 200
                }
            }

            return {
                data: [],
                menssage: "Ha ocurido un error al actualizar la imagen de perfi del usuario",
                status: 400
            }
 
        } catch(error ){
            return {
                data: [],
                menssage: error,
                status: 500
            }
        }
    }

    private async uploadImagesToS3(
        file: any,
        responseData: any,
    ): Promise<any> {
    
        const route = `users/${responseData._id}/${file.originalname}`;
    
        const audioCommand = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: route,
            Body: file.buffer, 
            ContentType: file.mimetype,
        });

        const imagaUrl = await this.s3.send(audioCommand).then((response) => {
            return `https://${this.bucketName}.s3.amazonaws.com/${route}`;
        });

        await Promise.all(imagaUrl);

        const response = await this.usersModel.findOneAndUpdate(
            { _id: responseData._id },
            { avatar: imagaUrl },      
            { new: true }              
        );
          
        console.log(response);
          
  
        return response;
    }

}
