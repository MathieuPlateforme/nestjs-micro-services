import { v4 as uuidv4 } from 'uuid';

export class ClientDto {
    id: string;
    idUser: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;

    constructor() {
        this.id = uuidv4();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}