import { ConfigService } from "@nestjs/config";
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly _configService;
    constructor(_configService: ConfigService);
    validate(payload: any): Promise<{
        id: any;
        user: any;
        role: any;
    }>;
}
export {};
