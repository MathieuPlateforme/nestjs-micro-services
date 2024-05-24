import {ProductID} from "../../domain/value-objects/product-id.value-object";
import {Address} from "../../domain/value-objects/address.value-object";


export class PrismaCommandeDTO {
    id: string;
    clientId: string;
    deliveryAddressId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    lignesCommande: {
        id: string;
        quantity: number;
        price: number;
        productId: ProductID;
    }[];
    client: {
        id: string;
        idUser: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        email: string;
    };
    deliveryAddress: Address;
}
