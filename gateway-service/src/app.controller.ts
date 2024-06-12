import { Controller, Post, Body, Get, Param, HttpStatus, HttpException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './create-order.dto';
import { AppService } from './app.service';

@Controller('orders')
export class ApiGatewayController {
    constructor(private readonly appService: AppService) {}

    @Post('order')
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.appService.createOrder(createOrderDto);;
    }

    @Get(':id')
    async getOrder(@Param('id') id: string) {
        return this.appService.getOrder(id);;
    }
    @Post('signup')
    async signup(@Body() signupdto: UserRegistrationDTO) {
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
