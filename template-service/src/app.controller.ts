import { Controller, Get, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { UserDto } from './user.dto';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create_user')
  createUser(userDto: UserDto) {
    this.appService.handleUserCreation(userDto);
  }
}
