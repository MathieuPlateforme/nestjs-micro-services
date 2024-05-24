import { Controller, Post, Body, Get, Param, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {CreateOrderDto} from "./create-order.dto";


@Controller('orders')
export class ApiGatewayController {
  constructor(@Inject('ORDER_SERVICE') private readonly commandService: ClientProxy) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.commandService.send('create_order', createOrderDto).toPromise();
  }

  @Get(':id')
  async getOrder(@Param('id') id: string) {
    return this.commandService.send('get_order', id).toPromise();
  }
}
