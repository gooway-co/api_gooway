import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeviceUser, DeviceUserDocument } from './schema/device-user.schema';
import { Model } from 'mongoose';
import { DeviceUserDto } from './dto/device-user.dto';
import { SentNotificationDeviceDto } from './dto/send-notification.dto';
const axios = require('axios');
import * as admin from 'firebase-admin';



@Injectable()
export class DeviceUserService {

   

    constructor(
        @InjectModel(DeviceUser.name) private _deviceUserModel: Model<DeviceUserDocument>,
        @Inject('FIREBASE_APP') private firebaseApp: admin.app.App, // Inyección del proveedor FIREBASE_APP

    ){
 
    }

    async saveInfoDeviceUser(deviceUserDto: DeviceUserDto ):Promise<any> {

        try {

            const  tokenExist = await this._deviceUserModel.findOne({"token" : deviceUserDto.token});

            if(tokenExist) {
                return {
                    data: [],
                    menssage: "El token ya existe",
                    status: 500
                }
            }

            const response  = await new this._deviceUserModel(deviceUserDto);
            await response.save(); 

            if(response){

                return {
                    data: response,
                    menssage: "Información guardada con exito",
                    status: 200
                }
            }

        }catch(error){
            return {
                data: [],
                menssage: error.message || error,
                status: 500
            };
        }

    }



    async sendNotificationDevice(sentNotificationDto: SentNotificationDeviceDto): Promise<any> {
        try {
            const tokens = await this._deviceUserModel.find({});
    
            if (tokens.length === 0) {
                return {
                    data: [],
                    message: "No se ha encontrado token para enviar notificaciones",
                    status: 400,
                };
            }
    
            const invalidTokens: string[] = [];
    
            for (const tokenEntry of tokens) {
                const message = {
                    token: tokenEntry.token, // Token del dispositivo
                    notification: {
                        title: sentNotificationDto.title, // Título de la notificación
                        body: sentNotificationDto.body,   // Cuerpo de la notificación
                    },
                    data: {}, // Datos adicionales para tu app
                };
    
                try {
                    // Enviar la notificación
                    const response = await this.firebaseApp.messaging().send(message);
                    console.log("Notificación enviada con éxito: ", response);
                } catch (error) {
                    console.error("Error al enviar notificación: ", error);
    
                    // Verificar si el error es debido a un token inválido
                    if (
                        error.code === "messaging/registration-token-not-registered" ||
                        error.code === "messaging/invalid-registration-token"
                    ) {
                        // Agregar el token inválido a la lista para eliminarlo
                        invalidTokens.push(tokenEntry.token);
                    }
                }
            }
    
            // Eliminar los tokens inválidos de la base de datos
            if (invalidTokens.length > 0) {
                await this._deviceUserModel.deleteMany({ token: { $in: invalidTokens } });
                console.log("Tokens inválidos eliminados: ", invalidTokens);
            }
    
            return {
                data: [],
                message: "Notificaciones enviadas (se eliminaron tokens inválidos si los había)",
                status: 200,
            };
        } catch (error) {
            console.error("Error en sendNotificationDevice: ", error);
            return {
                data: [],
                message: error.message || "Ocurrió un error al enviar notificaciones",
                status: 500,
            };
        }
    }
    
    
}
