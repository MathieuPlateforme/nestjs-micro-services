import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserDto } from './user.dto';
import { ResponseDTO } from './response.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @MessagePattern('create_user')
  async createUser(userDto: UserDto) {
    const response = new ResponseDTO();

    try {
      await this.appService.handleUserCreation(userDto);

      response.code = 201;
      response.message = 'User created';
      response.data = userDto;

    } catch (error) {

      response.code = 500;
      response.message = 'Internal server error';
      response.error = error;

    }

    return response;
  }
}