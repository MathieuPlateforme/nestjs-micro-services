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
        return await this.commandeService.creerCommande(clientId, address, lines);
    }

    @MessagePattern('get_order')
    async handleGetOrder(orderId: string) {
        return await this.commandeService.getCommande(orderId);
    }
}
