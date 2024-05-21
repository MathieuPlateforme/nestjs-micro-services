import { Module } from '@nestjs/common';
import { SeedServices } from './seed.services';
import { SeedController } from './seed.controller';
import { DatabaseModule } from '../database/database.module';
import { userProviders } from '../providers/User.provider';
import { articleProviders } from '../providers/Article.provider';
import { roleProviders } from '../providers/Role.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [SeedController],
  providers: [SeedServices,...userProviders,...articleProviders,...roleProviders],
  exports: [SeedServices],
})
export class SeedModule {}
