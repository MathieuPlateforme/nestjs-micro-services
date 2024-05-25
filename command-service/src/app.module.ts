import { Module } from '@nestjs/common';
import { CommandesModule } from './commandes.module';
import { CommandeMessageHandler } from './infrastructure/messaging/commande.message.handler';

@Module({
  imports: [CommandesModule],
  controllers: [CommandeMessageHandler], // Utilisation de controllers au lieu de providers
})
export class AppModule {}
