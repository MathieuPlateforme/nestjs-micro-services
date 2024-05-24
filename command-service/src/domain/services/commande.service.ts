// src/domain/services/commande.service.ts
import { Injectable } from '@nestjs/common';
import { CommandeRepository } from '../../infrastructure/repositories/commande.repository';
import { CommandeFactory } from '../factories/commande.factory';
import { CreateOrderDto } from '../../api/dto/create-order.dto';
import { ClientID } from '../value-objects/client-id.value-object';
import { Address } from '../value-objects/address.value-object';
import { LigneCommande } from '../entities/ligne-commande.entity';
import { EventEmitter2 } from 'eventemitter2';
import { Commande } from '../entities/commande.entity';
import { OrderID } from '../value-objects/order-id.value-object';
import {ProductID} from "../value-objects/product-id.value-object";
import {Money} from "../value-objects/money.value-object";

@Injectable()
export class CommandeService {
    constructor(
        private readonly commandeRepository: CommandeRepository,
        private readonly commandeFactory: CommandeFactory,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    async créerCommande(createOrderDto: CreateOrderDto): Promise<Commande> {
        const clientIdVo = new ClientID(createOrderDto.clientId);
        const address = new Address(
            createOrderDto.address.id,
            createOrderDto.address.street,
            createOrderDto.address.city,
            createOrderDto.address.zipCode,
            createOrderDto.address.country,
        );
        const lines = createOrderDto.lines.map(line => new LigneCommande(
            new ProductID(line.productId),
            line.quantity,
            new Money(line.price, line.currency)
        ));
        const commande = this.commandeFactory.createCommande(clientIdVo.value, address, lines);
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
        }
    }

    async cancelCommande(orderId: string): Promise<void> {
        const orderIdVo = new OrderID(orderId);
        const commande = await this.commandeRepository.findById(orderIdVo);
        if (commande) {
            commande.changeStatus('Canceled');
            await this.commandeRepository.save(commande);
        }
    }
}
