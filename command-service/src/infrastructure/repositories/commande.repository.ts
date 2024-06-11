import { Prisma, PrismaClient } from '@prisma/client';
import { Commande } from '../../domain/entities/commande.entity';
import { OrderID } from '../../domain/value-objects/order-id.value-object';
import { LigneCommande } from '../../domain/entities/ligne-commande.entity';
import { ProductID } from '../../domain/value-objects/product-id.value-object';
import { Money } from '../../domain/value-objects/money.value-object';
import { ClientID } from '../../domain/value-objects/client-id.value-object';
import { Address as AddressValueObject } from '../../domain/value-objects/address.value-object';
import { PrismaService } from '../prisma/prisma.service';
import {Inject, Logger} from '@nestjs/common';

export class CommandeRepository {
    private readonly logger = new Logger(CommandeRepository.name);

    constructor(@Inject(PrismaService)
        private prisma: PrismaService) {}

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
        const createData = this.toPrismaCreate(commande);
        await this.prisma.commande.create({ data: createData });
    }

    private toPrismaCreate(commande: Commande): Prisma.CommandeCreateInput {
        const data: Prisma.CommandeCreateInput = {
            id: commande.id.value,
            client: { connect: { id: commande.clientId.value } },
            deliveryAddress: { connect: { id: commande.deliveryAddress.id } },
            status: commande.status,
            lignesCommande: {
                create: commande.lines.map(line => ({
                    quantity: line.quantity,
                    price: line.price.amount,
                    product: { connect: { id: line.productId.value } },
                })),
            },
        };
        return data;
    }

    private toDomain(prismaCommande: Prisma.CommandeGetPayload<{
        include: { lignesCommande: true, client: true, deliveryAddress: true }
    }>): Commande {
        const lines = prismaCommande.lignesCommande.map(line => new LigneCommande(
            new ProductID(line.productId),
            line.quantity,
            new Money(line.price, 'USD'),
        ));

        const address = new AddressValueObject(
            prismaCommande.deliveryAddress.id,
            prismaCommande.deliveryAddress.street,
            prismaCommande.deliveryAddress.city,
            prismaCommande.deliveryAddress.zipCode,
            prismaCommande.deliveryAddress.country
        );

        return new Commande(
            new OrderID(prismaCommande.id),
            new ClientID(prismaCommande.clientId),
            address,
            lines,
            prismaCommande.status,
            prismaCommande.createdAt,
            prismaCommande.updatedAt
        );
    }
}
