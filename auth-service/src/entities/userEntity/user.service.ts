import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserRegistrationDTO } from "./UserRegistrationDTO";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }
    async findOneByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where: {
                email: email
            }
        });
    }
    async create(user: UserRegistrationDTO): Promise<User> {
        return await this.userRepository.save(user);
    }

    async update(id: number, user: User): Promise<User> {
        await this.userRepository.update(id, user);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
