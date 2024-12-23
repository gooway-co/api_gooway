import { UserDTO } from './dtos/users.dto';
import { UsersService } from './users.service';
import { UserAdminDTO } from './dtos/users-admin.dto';
export declare class UsersController {
    private readonly userSevices;
    constructor(userSevices: UsersService);
    insertar(userDTO: UserDTO): Promise<import("../../shared/utils/IResponse.util").IResponse>;
    register(userDtoAdmin: UserAdminDTO): Promise<import("../../shared/utils/IResponse.util").IResponse>;
    createCategori(userDTO: UserDTO, file: Express.Multer.File, idUsuario: any): Promise<any>;
    listarPorId(idUsuario: any): Promise<import("../../shared/utils/IResponse.util").IResponse>;
    actualizar(idUsuario: any, userDTO: UserDTO): Promise<import("../../shared/utils/IResponse.util").IResponse>;
}
