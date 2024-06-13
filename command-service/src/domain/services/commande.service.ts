import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { Commande } from '../entities/commande.entity';
import { Address } from '../value-objects/address.value-object';
import { LigneCommande } from '../entities/ligne-commande.entity';
import { CreateOrderDto } from '../../api/dto/create-order.dto';
import { CommandeRepository } from '../../infrastructure/repositories/commande.repository';
import { CommandeFactory } from '../factories/commande.factory';
import { OrderCreatedEvent } from '../../common/events/order-created.event';
import { OrderUpdatedEvent } from '../../common/events/order-updated.event';
import { OrderCanceledEvent } from '../../common/events/order-canceled.event';
import { OrderID } from '../value-objects/order-id.value-object';
import { ProductID } from '../value-objects/product-id.value-object';
import { Money } from '../value-objects/money.value-object';
import { EventPublisherService } from '../../infrastructure/messaging/event-publisher.service'; // Import EventPublisherService

@Injectable()
export class CommandeService {
    constructor(
        private readonly commandeRepository: CommandeRepository,
        private readonly eventEmitter: EventEmitter2,
        private readonly commandeFactory: CommandeFactory,
        private readonly eventPublisher: EventPublisherService // Inject EventPublisherService
    ) {}

    async creerCommande(clientId: string, address: CreateOrderDto['address'], lignes: CreateOrderDto['lines']): Promise<Commande> {
        const addressVo = new Address(address.id, address.street, address.city, address.zipCode, address.country);
        const lignesVo = lignes.map(line => new LigneCommande(new ProductID(line.productId), line.quantity, new Money(line.price, line.currency)));

        const commande = this.commandeFactory.createCommande(clientId, addressVo, lignesVo);
        await this.commandeRepository.save(commande);
        return commande;
    }

    async getCommande(orderId: string): Promise<Commande | undefined> {
        const orderIdVo = new OrderID(orderId);
        return await this.commandeRepository.findById(orderIdVo);
    }

    async updateCommande(orderId: string, status: string): Promise<void> {
        const orderIdVo = new OrderID(orderId);
        const commande = await this.commandeRepository.findById(orderIdVo);
        if (commande) {
            commande.changeStatus(status);
            await this.commandeRepository.save(commande);
            this.eventEmitter.emit('order.updated', new OrderUpdatedEvent(orderId, status));
            await this.eventPublisher.publishEvent('order.updated', new OrderUpdatedEvent(orderId, status)); // Publish event
        }
    }

    async cancelCommande(orderId: string): Promise<void> {
        const orderIdVo = new OrderID(orderId);
        const commande = await this.commandeRepository.findById(orderIdVo);
        if (commande) {
            commande.changeStatus('Canceled');
            await this.commandeRepository.save(commande);
            this.eventEmitter.emit('order.canceled', new OrderCanceledEvent(orderId));
           await this.eventPublisher.publishEvent('order.canceled', new OrderCanceledEvent(orderId)); // Publish event
        }
    }
}
