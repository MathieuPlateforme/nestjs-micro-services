// src/app.service.ts
import { Inject, Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import {ClientProxy, EventPattern, MessagePattern, Payload} from '@nestjs/microservices';
import { CreateOrderDto } from './create-order.dto';
import { SigninDto, UserRegistrationDTO } from './signup.dto';

@Injectable()
export class AppService {
  constructor(@Inject('ORDERS_SERVICE') private readonly commandService: ClientProxy,
              @Inject('AUTH_SERVICE') private readonly authService:ClientProxy,
              @Inject('EVENTS_SERVICE') private readonly eventsService: ClientProxy,
            @Inject('MAILS_SERVICE')private readonly mailService: ClientProxy,) {}


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

    async deleteOrder(id: string) {
      try {
                const response = await firstValueFrom(
                    this.commandService.send('cancel_order', id).pipe(
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



    async signup(signupdto: UserRegistrationDTO) {
        try {
            const response = await firstValueFrom(
                this.authService.send('signup', signupdto).pipe(
                    catchError(err => {
                        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
                    })
                )
            );
    
            await firstValueFrom(
                this.commandService.send('create_client', {
                    idUser: response.id,
                    name: response.firstname,
                    email: response.email
                }).pipe(
                    catchError(async err => {
                        console.log('Error during create_client:', err);
    
                        await firstValueFrom(this.authService.send('delete_user', response.id));
    
                        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
                    })
                )
            );
    
            return response;
        } catch (err) {
            console.log('Caught error:', err);
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

async signin(signinDto: SigninDto) {
  try {
      const response = await firstValueFrom(
          this.authService.send('signin', signinDto
          ).pipe(
              catchError(err => {
                  throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
              })
          )
      );
      console.log('utilisateur connecté:', response);
      return response;
  } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
  async info(id:Number){
    try{
        const response = await firstValueFrom(
            this.authService.send('info', id
            ).pipe(
                catchError(err => {
                    throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
                })
            )
        );
        console.log('user info:', response);
        return response;
    } catch (err) {
        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

    @MessagePattern('order.created')
    async handleOrderCreated(@Payload() data: any) {
        console.log('Order Created Event received SERVICE:', data);
        // Traitez l'événement de création de commande ici
        //
        //
        //
    }

    @MessagePattern('order.updated')
    async handleOrderUpdated(@Payload() data: any) {
        console.log('Order Updated Event received:', data);
        // Traitez l'événement de mise à jour de commande ici
    }

    @MessagePattern('order.canceled')
    async handleOrderCanceled(@Payload() data: any) {
        console.log('Order Canceled Event received:', data);
        // Traitez l'événement d'annulation de commande ici
    }


    async getAllProducts() {
        try {
            const response = await firstValueFrom(
                this.commandService.send('get_all_products', {}).pipe(
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

    async handleMail(data:any){
        try{
            const response = await firstValueFrom(
                this.mailService.send('send_mail', data
                ).pipe(
                    catchError(err => {
                        throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
                    })
                )
            );
            console.log('user info:', response);
            return response;
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}
