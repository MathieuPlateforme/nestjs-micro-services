// src/commandes.module.ts
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CommandeRepository } from "./infrastructure/repositories/commande.repository";
import { CommandeService } from "./domain/services/commande.service";
import { CommandeFactory } from "./domain/factories/commande.factory";
import { PrismaService } from "./infrastructure/prisma/prisma.service";
import { CommandeMessageHandler } from "./infrastructure/messaging/commande.message.handler";
import { ProduitService } from './domain/services/produit.service';
import { ProduitMessageHandler } from './infrastructure/messaging/produit.message.handler';
import { EventPublisherService } from './infrastructure/messaging/event-publisher.service'; // Importer EventPublisherService

@Module({
    imports: [EventEmitterModule.forRoot()],
    providers: [
        CommandeService,
        CommandeFactory,
        CommandeRepository,
        PrismaService,
        ProduitService, // Assurez-vous que ProduitService est bien ici
        EventPublisherService, // Ajouter EventPublisherService ici
    ],
    controllers: [
        CommandeMessageHandler,
        ProduitMessageHandler, // Ajoutez ProduitMessageHandler ici
    ],
    exports: [CommandeService],
})
export class CommandesModule {}
