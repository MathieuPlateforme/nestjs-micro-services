import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { SeedModule } from './seeds/seed.module'

@Module({
  imports: [DatabaseModule, SeedModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
