import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreation(userDto: UserDto) {
    console.log('User created', userDto);
    return userDto;
  }
}
