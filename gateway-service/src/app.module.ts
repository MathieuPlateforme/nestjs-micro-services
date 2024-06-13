import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ApiGatewayController } from './app.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'orders-queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auth-queue',
          queueOptions: {
            durable: true,
          },
        },
      },
      {
        name: 'EVENTS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'events-queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [ApiGatewayController],
  providers: [AppService],
})
export class AppModule {}
