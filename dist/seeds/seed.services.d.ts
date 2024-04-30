import { User } from '../entities/User.entity';
import { Article } from "../entities/Article.entity";
import { Role } from '../entities/Role.entity';
import { Repository } from 'typeorm';
export declare class SeedServices {
    private readonly userRepository;
    private readonly articleRepository;
    private readonly roleRepository;
    constructor(userRepository: Repository<User>, articleRepository: Repository<Article>, roleRepository: Repository<Role>);
    createRandomUsers(): Promise<void>;
    createRandomArticles(): Promise<void>;
    createRoles(): Promise<void>;
}
