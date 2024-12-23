import { ConfigService } from "@nestjs/config";
import { Request } from "express";
declare const JwtRefreshStrategy_base: new (...args: any[]) => any;
export declare class JwtRefreshStrategy extends JwtRefreshStrategy_base {
    private readonly _configService;
    constructor(_configService: ConfigService);
    validate(req: Request, payload: any): any;
}
export {};
