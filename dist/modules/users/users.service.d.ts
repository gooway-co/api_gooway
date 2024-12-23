import { UserDocument } from './schema/users.schema';
import { UserDTO } from './dtos/users.dto';
import { IResponse } from '../../shared/utils/IResponse.util';
import { Model } from "mongoose";
import { UserAdminDTO } from './dtos/users-admin.dto';
import { S3Client } from '@aws-sdk/client-s3';
export declare class UsersService {
    private usersModel;
    private readonly s3;
    private readonly bucketName;
    constructor(usersModel: Model<UserDocument>, s3: S3Client);
    insertar(userDto: UserDTO): Promise<IResponse>;
    update(createUserDTO: UserDTO, idUsuario: any): Promise<IResponse>;
    gestClientById(idUsuario: string): Promise<IResponse>;
    registerUserAdmin(userDtoAdmin: UserAdminDTO): Promise<IResponse>;
    uploadAvatar(userDTO: UserDTO, idUsuario: string): Promise<any>;
    private uploadImagesToS3;
}
