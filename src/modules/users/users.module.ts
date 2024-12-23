import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AwsS3Module } from '../aws/aws-s3.module';



@Module({
    imports:[ 
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        AwsS3Module
    ],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
