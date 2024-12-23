import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/modules/auth/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly authService: AuthService) { }

    async canActivate(
        context: ExecutionContext,
    ):  Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.authService.extractTokenFromHeader(request);
     
        if (!token) {
            throw new UnauthorizedException();
        }
        const responseToken =  await this.authService.validateToken(token);
        if (!responseToken) {
            throw new UnauthorizedException();
        }
        return responseToken;
    }

   
}


