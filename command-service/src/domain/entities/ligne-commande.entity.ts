// src/domain/entities/ligne-commande.entity.ts
import { ProductID } from '../value-objects/product-id.value-object';
import { Money } from '../value-objects/money.value-object';

export class LigneCommande {
    constructor(private _productId: ProductID, private _quantity: number, private _price: Money) {
        if (_quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
    }

    get productId(): ProductID {
        return this._productId;
    }

    get quantity(): number {
        return this._quantity;
    }

    get price(): Money {
        return this._price;
    }

    getTotal(): Money {
        return new Money(this._quantity * this._price.amount, this._price.currency);
    }
}
