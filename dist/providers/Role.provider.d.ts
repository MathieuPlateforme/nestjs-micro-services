import { DataSource } from 'typeorm';
import { Role } from 'src/entities/Role.entity';
export declare const roleProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Role>;
    inject: string[];
}[];
