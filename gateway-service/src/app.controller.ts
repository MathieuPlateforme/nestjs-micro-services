import { Body, Controller, Get, Inject, Post, Put } from '@nestjs/common';
import { UserDto } from './user.dto';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { CreateOrderDto } from './create-order.dto';
import { UpdateOrderDto } from './update-order.dto';

@Controller()
export class AppController {
  constructor(@Inject('TEMPLATE-SERVICE') private readonly templateService: ClientProxy,
              @Inject('COMMAND-SERVICE') private readonly commandService: ClientProxy) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Post()
  createUser(@Body() userDto: UserDto) {
    return this.templateService.send('create_user', userDto);
  }

  @Post('orders')
  createOrder(@Body() order: CreateOrderDto) {
    return this.commandService.send('create_order', order);
  }

  @Put('orders')
  updateOrder(@Body() order: UpdateOrderDto) {
    return this.commandService.send('update_order', order);
  }
}
