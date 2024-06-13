import {Controller, Post, Body, Get, Param, HttpStatus, HttpException, Delete} from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './create-order.dto';
import { AppService } from './app.service';
import { SigninDto, UserRegistrationDTO } from './signup.dto';
import {EventPattern, MessagePattern, Payload} from "@nestjs/microservices";

@Controller('orders')
export class ApiGatewayController {
    constructor(private readonly appService: AppService) {}

    @Post('order')
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.appService.createOrder(createOrderDto);
    }

    @Get(':id')
    async getOrder(@Param('id') id: string) {
        return this.appService.getOrder(id);
    }

    @Delete(':id')
    async deleteOrder(@Param('id') id: string) {
        return this.appService.deleteOrder(id);
    }



    @Post('signup')
    async signup(@Body() signupDto:UserRegistrationDTO){
        return this.appService.signup(signupDto)
    }
  
    @Post('signin')
    async signin(@Body() signinDto:SigninDto){
        return this.appService.signin(signinDto)
    }
    @Post('info')
    async info(@Body() id:number){
        return this.appService.info(id)
    }

    @EventPattern('order.created')
    async handleOrderCreated(@Payload() data: any) {
        console.log('Order Created Event received:', data);
        // Traitez l'événement de création de commande ici
        //
        //
        //
    }

    @EventPattern('order.updated')
    async handleOrderUpdated(@Payload() data: any) {
        console.log('Order Updated Event received:', data);
        // Traitez l'événement de mise à jour de commande ici
        //
        //
        //
    }

    @EventPattern('order.canceled')
    async handleOrderCanceled(@Payload() data: any) {
        console.log('Order Canceled Event received:', data);
        // Traitez l'événement d'annulation de commande ici
        //
        //
        //
    }
}
