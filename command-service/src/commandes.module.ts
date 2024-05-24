import { Module } from '@nestjs/common';

import { EventEmitterModule } from '@nestjs/event-emitter';
import {CommandeRepository} from "./infrastructure/repositories/commande.repository";
import {CommandeService} from "./domain/services/commande.service";
import {CommandeFactory} from "./domain/factories/commande.factory";
import {PrismaService} from "./infrastructure/prisma/prisma.service";


@Module({
    imports: [EventEmitterModule.forRoot()],
    providers: [
        CommandeService,
        CommandeFactory,
        CommandeRepository,
        PrismaService,
    ],
    exports: [CommandeService],
})
export class CommandesModule {}
