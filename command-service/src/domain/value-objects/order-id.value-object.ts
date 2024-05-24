// src/domain/value-objects/order-id.value-object.ts
export class OrderID {
    constructor(private readonly _value: string) {
        if (!this.isValidID(_value)) {
            throw new Error('Invalid Order ID');
        }
    }

    get value(): string {
        return this._value;
    }

    private isValidID(id: string): boolean {
        return id.length > 0.
    }

    equals(other: OrderID): boolean {
        return other instanceof OrderID && this._value === other._value;
    }
}
