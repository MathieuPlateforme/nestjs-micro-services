import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/entities/userEntity/user.service';
import { UserRegistrationDTO } from 'src/entities/userEntity/UserRegistrationDTO';
import { User } from 'src/entities/userEntity/user.entity';
import { SigninDto } from 'src/entities/userEntity/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (user && user.password === password) { // Replace with hashed password comparison
      return user;
    }
    return null;
  }

  async register(userDto: UserRegistrationDTO): Promise<User> {
    return this.userService.create(userDto);
  }

  async login(signinDto: SigninDto): Promise<{ access_token: string }> {
    const user = await this.validateUser(signinDto.email, signinDto.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
