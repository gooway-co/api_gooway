import { Model } from "mongoose";
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dtos/usuarios.dto';
import { User, UserDocument } from '../users/schema/users.schema';
import { IResponse } from 'src/shared/utils/IResponse.util';
import { Request } from 'express';
export declare class AuthService {
    private usersModel;
    private jwtService;
    constructor(usersModel: Model<UserDocument>, jwtService: JwtService);
    login(authDTO: AuthDTO): Promise<IResponse>;
    validateUser(email: string, password: string): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    validateToken(token: string): Promise<boolean>;
    validateUserToken(request: any): Promise<any>;
    extractTokenFromHeader(request: Request): string | undefined;
    recoverPassword(email: string): Promise<IResponse>;
    validateUserByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & Document & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
