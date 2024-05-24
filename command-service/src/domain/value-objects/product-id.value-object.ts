// src/domain/value-objects/product-id.value-object.ts
export class ProductID {
    constructor(private readonly _value: string) {
        if (!this.isValidID(_value)) {
            throw new Error('Invalid Product ID');
        }
    }

    get value(): string {
        return this._value;
    }

    private isValidID(id: string): boolean {
        return id.length > 0;
    }

    equals(other: ProductID): boolean {
        return other instanceof ProductID && this._value === other._value;
    }
}
