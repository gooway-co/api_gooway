import { Model } from "mongoose";
import { MailerService } from '@nestjs-modules/mailer';
import { AuthService } from '../auth/auth.service';
import { OtpDocument } from './schema/otp.schema';
import { UserDocument } from '../users/schema/users.schema';
export declare class EmailsService {
    private usersModel;
    private _otpModel;
    private readonly mailerService;
    private readonly _authService;
    constructor(usersModel: Model<UserDocument>, _otpModel: Model<OtpDocument>, mailerService: MailerService, _authService: AuthService);
    sendEmailWithOTP(subject: string, template: string, context: any, body: any): Promise<{
        menssage: string;
        data: any[];
        status: number;
    }>;
    sendPageWeb(to: string, subject: string, template: string, context: any): Promise<{
        menssage: string;
        data: any[];
        status: number;
    }>;
    validateCodeOTP(code: string, request: any): Promise<{
        menssage: string;
        data: import("mongoose").UpdateWriteOpResult[];
        status: number;
    }>;
}
