import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAIL-SERVICE',
        transport: Transport.TCP,
        options: {
          port: 3001
        },
      },
    ]),
    ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
