import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CategoriModule } from './modules/categories/categories.module';
import { PlaceModule } from './modules/places/places.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnerModule } from './modules/partners/partners.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { FavoriteModule } from './modules/favorite/favorite.module';
import { EventModule } from './modules/event/event.module';
import { DeviceUserModule } from './modules/device-user/device-user.module';
import { CitiesModule } from './modules/cities/cities.module';
import { EmailsModule } from './modules/email/email.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env.local' : `.env.${ENV}`
    }),
    MongooseModule.forRoot(`mongodb+srv://simasoftw:HqcrnC4KeJmJiPTj@cluster0.m1lzn0k.mongodb.net/gooway-dev`), 
    UsersModule,
    AuthModule,
    CategoriModule,
    PlaceModule,
    PartnerModule,
    FavoriteModule,
    EventModule,
    DeviceUserModule,
    CitiesModule,
    EmailsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
