import { Controller, Post, Body, Get, Param, HttpStatus, HttpException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './create-order.dto';
import { AppService } from './app.service';
import { SigninDto, UserRegistrationDTO } from './signup.dto';

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
    async signup(@Body() signupDto:UserRegistrationDTO){
        return this.appService.signup(signupDto)
    }
    @Post('signin')
    async signin(@Body() signinDto:SigninDto){
        return this.appService.signin(signinDto)
    }
}
