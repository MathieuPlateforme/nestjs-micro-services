import { ProductID } from '../value-objects/product-id.value-object';
import { Money } from '../value-objects/money.value-object';
import { v4 as uuidv4 } from 'uuid';

export class LigneCommande {
    private _id: string;

    constructor(private _productId: ProductID, private _quantity: number, private _price: Money) {
        if (_quantity <= 0) {
            throw new Error('Quantity must be greater than zero');
        }
        this._id = uuidv4();
    }

    get id(): string {
        return this._id;
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
