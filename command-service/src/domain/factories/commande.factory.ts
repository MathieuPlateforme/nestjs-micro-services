import { ClientIDUser } from '../value-objects/client-idUser.value-object';
import { OrderID } from '../value-objects/order-id.value-object';
import { Address } from '../value-objects/address.value-object';
import { LigneCommande } from '../entities/ligne-commande.entity';
import { Commande } from '../entities/commande.entity';
import { v4 as uuidv4 } from 'uuid';

export class CommandeFactory {
    createCommande(clientIdUser: number, address: Address, lines: LigneCommande[]): Commande {
        const clientIdVo = new ClientIDUser(clientIdUser);
        const orderId = new OrderID(uuidv4()); // Utilisation de UUID pour l'identifiant de la commande
        const lignesCommande = lines.map(line => new LigneCommande(line.productId, line.quantity, line.price)); // Génération des UUID pour les lignes de commande
        return new Commande(orderId, clientIdVo, address, lignesCommande);
    }
}
