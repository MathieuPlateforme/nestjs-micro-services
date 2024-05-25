import { Module } from '@nestjs/common';

import { EventEmitterModule } from '@nestjs/event-emitter';
import {CommandeRepository} from "./infrastructure/repositories/commande.repository";
import {CommandeService} from "./domain/services/commande.service";
import {CommandeFactory} from "./domain/factories/commande.factory";
import {PrismaService} from "./infrastructure/prisma/prisma.service";
import {CommandeMessageHandler} from "./infrastructure/messaging/commande.message.handler";
@Module({
    imports: [EventEmitterModule.forRoot()],
    providers: [
        CommandeService,
        CommandeFactory,
        CommandeRepository,
        PrismaService,
        CommandeMessageHandler,
    ],
    exports: [CommandeService],
})
export class CommandesModule {}
