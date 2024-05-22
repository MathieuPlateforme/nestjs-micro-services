import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRegistrationDTO } from 'src/entities/userEntity/UserRegistrationDTO';
import { UserService } from 'src/entities/userEntity/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: UserRegistrationDTO) {
    return this.userService.create(userDto);
  }
}
