// src/domain/services/produit.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@Injectable()
export class ProduitService {
    constructor(private prisma: PrismaService) {}

    async getAllProducts() {
        return this.prisma.produit.findMany();
    }
}
