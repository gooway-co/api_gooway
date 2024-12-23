import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AUTH_CONSTANTS } from "src/shared/utils/jwt.constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly _configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: AUTH_CONSTANTS.JWT_SECRET
        });
    }

    async validate(payload) {
        Logger.log('validate', 'JwtStrategy');
        return { id: payload.sub, user: payload.user, role: payload.role };
    }
}