import { DataSource } from 'typeorm';
import { Article } from 'src/entities/Article.entity';
import { Role } from 'src/entities/Role.entity';

export const roleProviders = [
  {
    provide: 'ROLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Role),
    inject: ['DATA_SOURCE'],
  },
];