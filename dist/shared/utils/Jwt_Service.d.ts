import { JwtService } from '@nestjs/jwt';
export declare class JwtServices {
    private readonly jwtService;
    constructor(jwtService: JwtService);
    createToken(userId: string): Promise<string>;
}
