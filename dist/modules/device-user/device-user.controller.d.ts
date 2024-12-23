import { DeviceUserService } from './device-user.service';
import { DeviceUserDto } from './dto/device-user.dto';
import { SentNotificationDeviceDto } from './dto/send-notification.dto';
export declare class DeviceUserController {
    private readonly _deviceUserService;
    constructor(_deviceUserService: DeviceUserService);
    saveTokenDevice(deviceUserDto: DeviceUserDto): Promise<any>;
    sendNotification(sentNotificationDto: SentNotificationDeviceDto): Promise<any>;
}
