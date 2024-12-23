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
            response.save(); 

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
                menssage: error,
                status: 500
            }
        }

    }



    async sendNotificationDevice(sentNotificationDto: SentNotificationDeviceDto): Promise<any> {
        try {
            const tokenExist = await this._deviceUserModel.find({});

            console.log("tokenExist ", tokenExist);
    
            if (tokenExist.length > 0) {
                console.log("entro en el ", tokenExist);
                for (const element of tokenExist) {
                    // Usamos await correctamente dentro del bucle
                    const message = {
                        token: element.token, // Token del dispositivo
                        notification: {
                          title: sentNotificationDto.title, // Título de la notificación
                          body: sentNotificationDto.body,   // Cuerpo de la notificación
                        },
                        data: {}, // Datos adicionales para tu app
                    };
                
                    const response = await this.firebaseApp.messaging().send(message);
                    console.log("response notification ", response);
                }

                return {
                    data: [],
                    message: "Notificaciones no enviadas",
                    status: 400
                };
            }

            return {
                data: [],
                message: "No se ha encontrado token para enviar notificaciones",
                status: 400
            };
    
        } catch (error) {
            return {
                data: [],
                message: error,
                status: 500
            };
        }
    }
    
}
