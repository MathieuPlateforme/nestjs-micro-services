import { Inject, Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './create-order.dto';

@Injectable()
export class AppService {
  constructor(@Inject('ORDERS_SERVICE') private readonly commandService: ClientProxy) {}


  async createOrder(createOrderDto: CreateOrderDto) {
    let messageData = {};
    try {
      const response = await firstValueFrom(
        this.commandService.send('create_order', createOrderDto).pipe(
            catchError(err => {
                throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
            })
        )
      );
      messageData = {... {"order": response}};
    } catch (err) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    return messageData;
  }

  async getOrder(id: string) {
    try {
      const response = await firstValueFrom(
        this.commandService.send('get_order', id).pipe(
            catchError(err => {
                throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
            })
        )
    );
    return response;
    } catch (err) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
