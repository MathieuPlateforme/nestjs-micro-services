import { Module } from '@nestjs/common';
import { databaseProviders } from './database.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/User.entity';

@Module({  
  providers: [...databaseProviders],
  exports: [...databaseProviders],
  
})
export class DatabaseModule {}