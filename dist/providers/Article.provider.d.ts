import { DataSource } from 'typeorm';
import { Article } from 'src/entities/Article.entity';
export declare const articleProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Article>;
    inject: string[];
}[];
