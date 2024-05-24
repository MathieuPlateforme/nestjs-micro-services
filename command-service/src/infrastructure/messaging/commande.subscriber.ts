// src/infrastructure/messaging/commande.subscriber.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { EventEmitter2 } from 'eventemitter2';
import { CommandeService } from '../../domain/services/commande.service';
import { CreateOrderDto } from '../../api/dto/create-order.dto';

@Injectable()
export class CommandeSubscriber implements OnModuleInit {
    constructor(
        @InjectQueue('order_queue') private readonly orderQueue: Queue,
        private readonly eventEmitter: EventEmitter2,
        private readonly commandeService: CommandeService,
    ) {}

    onModuleInit() {
        this.orderQueue.process('create_order', async (job) => {
            await this.handleCreateOrder(job.data);
        });

        this.orderQueue.process('get_order', async (job) => {
            return await this.commandeService.getCommande(job.data);
        });

        this.orderQueue.process('update_order', async (job) => {
            const { orderId, status } = job.data;
            await this.commandeService.updateCommande(orderId, status);
        });

        this.orderQueue.process('cancel_order', async (job) => {
            await this.commandeService.cancelCommande(job.data);
        });
    }

    async handleCreateOrder(createOrderDto: CreateOrderDto) {
        const { clientId, address, lines } = createOrderDto;
        await this.commandeService.creerCommande(clientId, address, lines);
    }
}
