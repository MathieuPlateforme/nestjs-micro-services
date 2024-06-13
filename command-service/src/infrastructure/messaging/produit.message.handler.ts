// src/infrastructure/messaging/produit.message.handler.ts
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProduitService } from '../../domain/services/produit.service';

@Controller()
export class ProduitMessageHandler {
    private readonly logger = new Logger(ProduitMessageHandler.name);

    constructor(private readonly produitService: ProduitService) {}

    @MessagePattern('get_all_products')
    async getAllProducts() {
        this.logger.log('Received request to get all products');
        const products = await this.produitService.getAllProducts();
        this.logger.log(`Returning ${products.length} products`);
        return products;
    }
}
