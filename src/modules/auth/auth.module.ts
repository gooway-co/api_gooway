import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AUTH_CONSTANTS } from 'src/shared/utils/jwt.constants';
import { JwtRefreshStrategy, JwtStrategy, LocalStrategy } from './strategies';
import { User, UserSchema } from '../users/schema/users.schema';

@Module({

    imports:[ 
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

        JwtModule.register({
            global: true,
            secret: AUTH_CONSTANTS.JWT_SECRET,
            signOptions: { expiresIn: '20h' },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy, 
        JwtStrategy, 
        JwtRefreshStrategy,

    ],
})
export class AuthModule {}
