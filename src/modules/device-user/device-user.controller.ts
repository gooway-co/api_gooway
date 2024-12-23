import { Body, Controller, Post } from '@nestjs/common';
import { DeviceUserService } from './device-user.service';
import { DeviceUserDto } from './dto/device-user.dto';
import { SentNotificationDeviceDto } from './dto/send-notification.dto';

@Controller('device')
export class DeviceUserController {

    constructor(
        private readonly _deviceUserService: DeviceUserService 
    ){}

    @Post("/create")
    async saveTokenDevice(@Body() deviceUserDto: DeviceUserDto) {
        return await this._deviceUserService.saveInfoDeviceUser(deviceUserDto);
    }

    @Post("/sendNotification")
    async sendNotification(@Body() sentNotificationDto: SentNotificationDeviceDto) {
        return await this._deviceUserService.sendNotificationDevice(sentNotificationDto);
    }

}
