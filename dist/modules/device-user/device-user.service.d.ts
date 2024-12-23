import { DeviceUserDocument } from './schema/device-user.schema';
import { Model } from 'mongoose';
import { DeviceUserDto } from './dto/device-user.dto';
import { SentNotificationDeviceDto } from './dto/send-notification.dto';
import * as admin from 'firebase-admin';
export declare class DeviceUserService {
    private _deviceUserModel;
    private firebaseApp;
    constructor(_deviceUserModel: Model<DeviceUserDocument>, firebaseApp: admin.app.App);
    saveInfoDeviceUser(deviceUserDto: DeviceUserDto): Promise<any>;
    sendNotificationDevice(sentNotificationDto: SentNotificationDeviceDto): Promise<any>;
}
