// src/messaging/commande.message.handler.ts
import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {CommandeService} from "../../domain/services/commande.service";
import {CreateOrderDto} from "../../api/dto/create-order.dto";


@Injectable()
export class CommandeMessageHandler {
    constructor(private readonly commandeService: CommandeService) {}

    @MessagePattern('create_order')
    async handleCreateOrder(createOrderDto: CreateOrderDto) {
        const { clientId, address, lines } = createOrderDto;
        await this.commandeService.créerCommande(clientId, address, lines);
    }

    @MessagePattern('get_order')
    async handleGetOrder(orderId: string) {
        return await this.commandeService.getCommande(orderId);
    }

    @MessagePattern('update_order')
    async handleUpdateOrder({ orderId, status }: { orderId: string, status: string }) {
        await this.commandeService.updateCommande(orderId, status);
    }

    @MessagePattern('cancel_order')
    async handleCancelOrder(orderId: string) {
        await this.commandeService.cancelCommande(orderId);
    }
}
