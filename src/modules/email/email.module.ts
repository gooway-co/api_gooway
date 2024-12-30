import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Emails, EmailSchema } from './schema/email.schema';
import { EmailsController } from './email.controller';
import { EmailsService } from './email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';  
import { AuthService } from '../auth/auth.service';
import { User, UserSchema } from '../users/schema/users.schema';
import { Otps, OtpSchema } from './schema/otp.schema';

@Module({
    imports:[ 
        MailerModule.forRoot({
            transport: {
              host: 'smtp.gmail.com',
              port: 465,
              secure: true,
              auth: {
                user: 'frainer2013@gmail.com',
                pass: 'cdwzptywvwmxglhh',
              },
            }, 
            template: {
              dir:  process.cwd() + '/src/modules/email/templates',
              adapter: new HandlebarsAdapter(), 
              options: {
                strict: true,
              },
            },
          }),
        MongooseModule.forFeature([{ name: Emails.name, schema: EmailSchema }]),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Otps.name, schema: OtpSchema }])


    ],
    controllers: [EmailsController],
    providers: [EmailsService, AuthService]
})
export class EmailsModule {}
