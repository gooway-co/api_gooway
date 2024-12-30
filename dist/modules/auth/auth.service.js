"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const jwt_1 = require("@nestjs/jwt");
const users_schema_1 = require("../users/schema/users.schema");
let AuthService = class AuthService {
    constructor(usersModel, jwtService) {
        this.usersModel = usersModel;
        this.jwtService = jwtService;
    }
    async login(authDTO) {
        try {
            let email = authDTO.email.toLocaleLowerCase().replace(" ", "");
            let password = authDTO.password.replace(" ", "");
            const user = await this.usersModel.findOne({ email: email });
            if (!user) {
                return {
                    data: [],
                    menssage: "El usuario no se encuantra registrado.",
                    status: 400
                };
            }
            if (user?.password !== password) {
                throw new common_1.UnauthorizedException();
            }
            const payload = { sub: user._id, username: user.email, };
            const access_token = await this.jwtService.signAsync(payload);
            return {
                data: [{ "token": access_token, email: user.email, name: user.name, id: user._id, avatar: user.avatar }],
                menssage: "Login exitoso",
                status: 200
            };
        }
        catch (error) {
            return {
                data: [],
                menssage: error.response.message,
                status: 401
            };
        }
    }
    async validateUser(email, password) {
        return await this.usersModel.findOne({ email: email });
    }
    async validateToken(token) {
        try {
            const decoded = this.jwtService.verify(token);
            const user = await this.usersModel.findOne({ email: decoded.username, status: "ACTIVE" });
            if (user == null) {
                return false;
            }
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async validateUserToken(request) {
        try {
            const [type, token] = request.headers.authorization?.split(' ') ?? [];
            if (!token) {
                throw new common_1.UnauthorizedException('Authorization header not found');
            }
            const decoded = this.jwtService.verify(token);
            const user = await this.usersModel.findOne({ email: decoded.username, status: 'ACTIVE' });
            if (!user) {
                throw new common_1.UnauthorizedException('User not found or inactive');
            }
            return user;
        }
        catch (e) {
            throw new common_1.UnauthorizedException('Invalid token or user not found');
        }
    }
    extractTokenFromHeader(request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
    async recoverPassword(email) {
        try {
            let emailReplace = email.toLocaleLowerCase().replace(" ", "");
            const user = await this.usersModel.findOne({ email: emailReplace });
            if (!user) {
                return {
                    data: [],
                    menssage: "El usuario no se encuantra registrado.",
                    status: 400
                };
            }
            return {
                data: [user],
                menssage: "Login exitoso",
                status: 200
            };
        }
        catch (error) {
            return {
                data: [],
                menssage: error.response.message,
                status: 401
            };
        }
    }
    async validateUserByEmail(email) {
        return await this.usersModel.findOne({ email: email });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map