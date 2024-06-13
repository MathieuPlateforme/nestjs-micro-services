import {AppService} from "./app.service";
import {Controller, Get} from "@nestjs/common";

@Controller('produits')
export class ApiGatewayProduitController {
    constructor(private readonly appService: AppService) {}

    @Get()
    async getAllProducts() {
        return this.appService.getAllProducts();
    }
}