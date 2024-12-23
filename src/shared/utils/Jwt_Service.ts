import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtServices {
  constructor(private readonly jwtService: JwtService) {}

  async createToken(userId: string): Promise<string> {
    return this.jwtService.signAsync({ userId });
  }

}