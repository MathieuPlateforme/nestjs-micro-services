import { Prisma, PrismaClient } from '@prisma/client';
import { Commande } from '../../domain/entities/commande.entity';
import { OrderID } from '../../domain/value-objects/order-id.value-object';
import { LigneCommande } from '../../domain/entities/ligne-commande.entity';
import { ProductID } from '../../domain/value-objects/product-id.value-object';
import { Money } from '../../domain/value-objects/money.value-object';
import { ClientID } from '../../domain/value-objects/client-id.value-object';
import { Address } from '../../domain/value-objects/address.value-object';

export class CommandeRepository {
    private prisma = new PrismaClient();

    async findById(orderId: OrderID): Promise<Commande | undefined> {
        const prismaCommande = await this.prisma.commande.findUnique({
            where: { id: orderId.value },
            include: {
                lignesCommande: true,
                client: true,
                deliveryAddress: true,
            },
        });
        if (prismaCommande) {
            return this.toDomain(prismaCommande);
        }
        return undefined;
    }

    async save(commande: Commande): Promise<void> {
        const data: Prisma.CommandeCreateInput = this.toPrisma(commande);
        await this.prisma.commande.upsert({
            where: { id: commande.id.value },
            create: data,
            update: data,
        });
    }

    generateId(): OrderID {
        return new OrderID('UUID_GENERATED'); // Replace with UUID generation logic
    }

    private toDomain(prismaCommande: any): Commande {
        const lines = prismaCommande.lignesCommande.map(line => new LigneCommande(new ProductID(line.productId), line.quantity, new Money(line.price, 'USD')));
        const address = new Address(
            prismaCommande.deliveryAddress.id,
            prismaCommande.deliveryAddress.street,
            prismaCommande.deliveryAddress.city,
            prismaCommande.deliveryAddress.zipCode,
            prismaCommande.deliveryAddress.country
        );
        return new Commande(new OrderID(prismaCommande.id), new ClientID(prismaCommande.clientId), address, lines, prismaCommande.status, prismaCommande.createdAt, prismaCommande.updatedAt);
    }

    private toPrisma(commande: Commande): Prisma.CommandeCreateInput {
        return {
            id: commande.id.value,
            client: { connect: { id: commande.clientId.value } },
            deliveryAddress: { connect: { id: commande.deliveryAddress.id } },
            deliveryAddressId: commande.deliveryAddress.id, // Ensure this field is included
            status: commande.status,
            lignesCommande: {
                create: commande.lines.map(line => ({
                    quantity: line.quantity,
                    price: line.price.amount,
                    product: { connect: { id: line.productId.value } },
                })),
            },
        };
    }
}
