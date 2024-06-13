import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CommandeService } from '../../domain/services/commande.service';
import { CreateOrderDto } from '../../api/dto/create-order.dto';
import { EventEmitter2 } from 'eventemitter2';
import { OrderCreatedEvent } from '../../common/events/order-created.event';
import { OrderUpdatedEvent } from '../../common/events/order-updated.event';
import { OrderCanceledEvent } from '../../common/events/order-canceled.event';

@Controller()
export class CommandeMessageHandler {
    private readonly logger = new Logger(CommandeMessageHandler.name);

    constructor(
        private readonly commandeService: CommandeService,
        private readonly eventEmitter: EventEmitter2
    ) {}

    @MessagePattern('create_order')
    async handleCreateOrder(createOrderDto: CreateOrderDto) {
        try {
            const { clientId, address, lines } = createOrderDto;
            if (!address || !address.id || !address.street || !address.city || !address.zipCode || !address.country) {
                throw new Error('Invalid address data');
            }
            const commande = await this.commandeService.creerCommande(clientId, address, lines);
            this.eventEmitter.emit('order.created', new OrderCreatedEvent(commande.id.value));
            return commande;
        } catch (error) {
            this.logger.error('Error handling create_order message', error.stack);
            throw error;
        }
    }

    @MessagePattern('get_order')
    async handleGetOrder(orderId: string) {
        try {
            return await this.commandeService.getCommande(orderId);
        } catch (error) {
            this.logger.error('Error handling get_order message', error.stack);
            throw error;
        }
    }

    @MessagePattern('update_order')
    async handleUpdateOrder({ orderId, status }: { orderId: string, status: string }) {
        try {
            await this.commandeService.updateCommande(orderId, status);
            this.eventEmitter.emit('OrderUpdated', new OrderUpdatedEvent(orderId, status));
        } catch (error) {
            this.logger.error('Error handling update_order message', error.stack);
            throw error;
        }
    }

    @MessagePattern('cancel_order')
    async handleCancelOrder(orderId: string) {
        try {
            await this.commandeService.cancelCommande(orderId);
            this.eventEmitter.emit('OrderCanceled', new OrderCanceledEvent(orderId));
        } catch (error) {
            this.logger.error('Error handling cancel_order message', error.stack);
            throw error;
        }
    }
}
