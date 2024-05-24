

// src/domain/factories/commande.factory.ts
import { ClientID } from '../value-objects/client-id.value-object';
import { OrderID } from '../value-objects/order-id.value-object';
import { Address } from '../value-objects/address.value-object';
import { LigneCommande } from '../entities/ligne-commande.entity';
import {Commande} from "../entities/commande.entity";

export class CommandeFactory {
    createCommande(clientId: string, address: Address, lines: LigneCommande[]): Commande {
        const clientIdVo = new ClientID(clientId);
        const orderId = new OrderID('UUID_GENERATED'); // Replace with actual UUID generation logic
        return new Commande(orderId, clientIdVo, address, lines);
    }
}
