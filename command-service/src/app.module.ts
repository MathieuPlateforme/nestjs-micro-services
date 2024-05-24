import { Module } from '@nestjs/common';
import { CommandesModule } from './commandes.module';
import {CommandeMessageHandler} from "./infrastructure/messaging/commande.message.handler";

@Module({
  imports: [CommandesModule],
  providers: [CommandeMessageHandler],
})
export class AppModule {}