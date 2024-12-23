import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly _authService: AuthService
    ) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        try {
            const user = await this._authService.validateUser(username, password);
            
            if (!user) {
                Logger.error('validate', 'LocalStrategy');
                throw new UnauthorizedException({
                    error: true,
                    msg: 'Usuario o contraseña incorrecta. Por favor, intente de nuevo.',
                    data: {}
                });
            }
    
            Logger.log('validate', 'LocalStrategy');
            return user;
        } catch(e) {
            Logger.error(e, 'LocalStrategy');
            throw (e);
        }
    }
}