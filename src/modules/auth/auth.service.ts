import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dtos/usuarios.dto';
import { User, UserDocument } from '../users/schema/users.schema';
import { IResponse } from 'src/shared/utils/IResponse.util';
import { Request, request } from 'express';

@Injectable()
export class AuthService {


  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>,
    private jwtService: JwtService
  ) { }


  async login(authDTO: AuthDTO): Promise<IResponse> {

    try {
      let email = authDTO.email.toLocaleLowerCase().replace(" ", "");
      let password = authDTO.password.replace(" ", "");
  
      const user = await this.usersModel.findOne({ email: email });

      if(!user){
        return {
          data: [],
          menssage: "El usuario no se encuantra registrado.",
          status: 400
        };
      }

      if (user?.password !== password) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user._id, username: user.email, };
      const access_token = await this.jwtService.signAsync(payload)
      
      return {
        data: [ {"token" :  access_token, email: user.email, name: user.name, id: user._id, avatar: user.avatar}],
        menssage: "Login exitoso",
        status: 200
      };
    } catch( error) {
      return {
        data: [],
        menssage: error.response.message,
        status: 401
      };
    }
   
  }

  async validateUser(email: string, password: string) {
    return await this.usersModel.findOne({ email: email });
  }

  async validateToken(token: string):Promise<boolean>  {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.usersModel.findOne({ email: decoded.username, status: "ACTIVE" });
      if(user == null) {
        return false;
      }

      return true;

    } catch (e) {
      return false;
    }
  }

  async validateUserToken(request: any): Promise<any> {
    try {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];

      if (!token) {
        throw new UnauthorizedException('Authorization header not found');
      }


      const decoded = this.jwtService.verify(token);
      const user = await this.usersModel.findOne({ email: decoded.username, status: 'ACTIVE' });

      if (!user) {
        throw new UnauthorizedException('User not found or inactive');
      }

      return user;
    } catch (e) {
      throw new UnauthorizedException('Invalid token or user not found');
    }
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async recoverPassword(email: string): Promise<IResponse> {

    try {
      let emailReplace = email.toLocaleLowerCase().replace(" ", "");
  
      const user = await this.usersModel.findOne({ email: emailReplace });

      if(!user){
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
    } catch( error) {
      return {
        data: [],
        menssage: error.response.message,
        status: 401
      };
    }
   
  }

  async validateUserByEmail(email: string) {
    return await this.usersModel.findOne({ email: email });
  }

  
}
