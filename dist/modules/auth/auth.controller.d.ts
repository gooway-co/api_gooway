import { AuthService } from './auth.service';
import { AuthDTO } from './dtos/usuarios.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createPost(authDTO: AuthDTO): Promise<import("../../shared/utils/IResponse.util").IResponse>;
    recoverPassword(authDTO: AuthDTO): Promise<import("../../shared/utils/IResponse.util").IResponse>;
    changePassword(body: any): Promise<any>;
}
