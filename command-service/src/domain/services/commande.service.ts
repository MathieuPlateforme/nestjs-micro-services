// src/domain/services/commande.service.ts
import { Injectable } from '@nestjs/common';
import { Commande } from '../entities/commande.entity';
import { OrderID } from '../value-objects/order-id.value-object';
import { ClientID } from '../value-objects/client-id.value-object';
import { Address } from '../value-objects/address.value-object';
import { LigneCommande } from '../entities/ligne-commande.entity';
import { ProductID } from '../value-objects/product-id.value-object';
import { Money } from '../value-objects/money.value-object';
import { EventEmitter2 } from 'eventemitter2';
import { CreateOrderDto } from '../../api/dto/create-order.dto';
import {CommandeRepository} from "../../infrastructure/repositories/commande.repository";
import {OrderCreatedEvent} from "../../common/events/order-created.event";
import {OrderUpdatedEvent} from "../../common/events/order-updated.event";
import {OrderCanceledEvent} from "../../common/events/order-canceled.event";


@Injectable()
export class CommandeService {
    constructor(
        private readonly commandeRepository: CommandeRepository,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async créerCommande(clientId: string, address: CreateOrderDto['address'], lignes: CreateOrderDto['lines']): Promise<Commande> {
        const clientIdVo = new ClientID(clientId);
        const addressVo = new Address(address.id, address.street, address.city, address.zipCode, address.country);
        const lignesVo = lignes.map(ligne => new LigneCommande(new ProductID(ligne.productId), ligne.quantity, new Money(ligne.price, ligne.currency)));
        const commande = new Commande(this.commandeRepository.generateId(), clientIdVo, addressVo, lignesVo);
        await this.commandeRepository.save(commande);
        this.eventEmitter.emit('OrderCreated', new OrderCreatedEvent(commande.id.value));
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
            this.eventEmitter.emit('OrderUpdated', new OrderUpdatedEvent(orderId, status));
        }
    }

    async cancelCommande(orderId: string): Promise<void> {
        const orderIdVo = new OrderID(orderId);
        const commande = await this.commandeRepository.findById(orderIdVo);
        if (commande) {
            commande.changeStatus('Canceled');
            await this.commandeRepository.save(commande);
            this.eventEmitter.emit('OrderCanceled', new OrderCanceledEvent(orderId));
        }
    }
}
