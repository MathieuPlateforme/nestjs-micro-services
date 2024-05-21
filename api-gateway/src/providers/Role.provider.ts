import { DataSource } from 'typeorm';
import { Article } from '../entities/Article.entity';
import { Role } from '../entities/Role.entity';

export const roleProviders = [
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
    inject: ['DATA_SOURCE'],
  },
];