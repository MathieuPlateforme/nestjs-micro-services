// commande-service/src/app.module.ts
import { Module } from '@nestjs/common';
import { CommandeService } from './domain/services/commande.service';
import { CommandeRepository } from './infrastructure/repositories/commande.repository';
import { CommandeFactory } from './domain/factories/commande.factory';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BullModule } from '@nestjs/bull';
import { CommandeSubscriber } from './infrastructure/messaging/commande.subscriber';
import { EventPublisherService } from './infrastructure/messaging/event-publisher.service';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    BullModule.registerQueue({
      name: 'order_queue',
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  providers: [CommandeService, CommandeFactory, CommandeSubscriber, EventPublisherService, CommandeRepository],
})
export class AppModule {}
