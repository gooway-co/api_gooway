import { Module } from '@nestjs/common';
import { DeviceUserController } from './device-user.controller';
import { DeviceUserService } from './device-user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceUser, DeviceUserSchema } from './schema/device-user.schema';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: DeviceUser.name, schema: DeviceUserSchema },
    ]),
    FirebaseModule
  ],
  controllers: [DeviceUserController],
  providers: [DeviceUserService],
  exports: [DeviceUserService],
})
export class DeviceUserModule {}
