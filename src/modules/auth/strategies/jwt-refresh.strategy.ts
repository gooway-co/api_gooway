import { ForbiddenException, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AUTH_CONSTANTS } from "src/shared/utils/jwt.constants";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        private readonly _configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: AUTH_CONSTANTS.REFRESH_JWT_SECRET,
            passReqToCallback: true
        });
    }

    validate(req: Request, payload: any): any {
        const refreshToken = req
            ?.get('authorization')
            ?.replace('Bearer', '')
            .trim();

        if (!refreshToken) throw new ForbiddenException('Refresh token malformed');
        
        Logger.log('validate', 'JwtRefreshStrategy');
        return {
            id: payload.sub, 
            user: payload.user,
            refreshToken,
        };
    }
}