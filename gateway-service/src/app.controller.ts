import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { UserDto } from './user.dto';
import { ClientProxy, EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('TEMPLATE-SERVICE') private readonly templateService: ClientProxy) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Post()
  createUser(@Body() userDto: UserDto) {
    return this.templateService.send('create_user', userDto);
  }
}
