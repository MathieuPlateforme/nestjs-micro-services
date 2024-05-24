import { Module } from '@nestjs/common';

import { EventEmitterModule } from '@nestjs/event-emitter';
import {CommandeService} from "./domain/services/commande.service";
import {CommandeFactory} from "./domain/factories/commande.factory";
import {CommandeMessageHandler} from "./infrastructure/messaging/commande.message.handler";
import {EventPublisherService} from "./infrastructure/messaging/event-publisher.service";
import {CommandeRepository} from "./infrastructure/repositories/commande.repository";
import {PrismaService} from "./infrastructure/prisma/prisma.service";


@Module({
    imports: [
        EventEmitterModule.forRoot(),
    ],
    providers: [
        CommandeService,
        CommandeFactory,
        CommandeMessageHandler,
        EventPublisherService,
        CommandeRepository,
        PrismaService
    ],
    exports: [CommandeService],
})
export class CommandesModule {}
