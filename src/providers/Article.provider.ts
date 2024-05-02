import { DataSource } from 'typeorm';
import { Article } from 'src/entities/Article.entity';

export const articleProviders = [
  {
    provide: 'ARTICLE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Article),
    inject: ['DATA_SOURCE'],
  },
];