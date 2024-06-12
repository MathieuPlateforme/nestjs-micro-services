import { Controller, Post, Body, Get, Param, Inject, HttpStatus, HttpException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './create-order.dto';
import { SignupDto } from './signup.dto';

@Controller('orders')
export class ApiGatewayController {
    constructor(@Inject('ORDERS_SERVICE') private readonly commandService: ClientProxy,@Inject('AUTH_SERVICE')private readonly authService:ClientProxy) {}

    @Post('order')
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        try {
            const response = await firstValueFrom(
                this.commandService.send('create_order', createOrderDto).pipe(
                    catchError(err => {
                        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
                    })
                )
            );
            console.log('Order Created Event received:', response);
            return response;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':id')
    async getOrder(@Param('id') id: string) {
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
    @Post('signup')
    async signup(@Body() signupdto: SignupDto) {
        try {
            const response = await firstValueFrom(
                this.authService.send('signup', signupdto
                ).pipe(
                    catchError(err => {
                        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
                    })
                )
            );
            console.log('utilisateur crée:', response);
            return response;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
