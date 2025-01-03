import { EmailsService } from './email.service';
export declare class EmailsController {
    private readonly emailSevices;
    constructor(emailSevices: EmailsService);
    sendEmailRecoveryPassword(body: any): Promise<{
        menssage: string;
        data: {
            id: import("mongoose").Types.ObjectId;
            email: string;
        }[];
        status: number;
    }>;
    sendPageWeb(body: any): Promise<{
        menssage: string;
        data: any[];
        status: number;
    }>;
    validateCodeOTP(body: any): Promise<{
        menssage: string;
        data: import("mongoose").UpdateWriteOpResult[];
        status: number;
    }>;
    forgottenPassword(body: any, request: any): Promise<{
        menssage: string;
        data: {
            id: import("mongoose").Types.ObjectId;
            email: string;
        }[];
        status: number;
    }>;
}
