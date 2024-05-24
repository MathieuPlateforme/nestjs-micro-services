// src/domain/value-objects/money.value-object.ts
export class Money {
    constructor(private readonly _amount: number, private readonly _currency: string) {
        if (!this.isValidAmount()) {
            throw new Error('Invalid Amount');
        }
    }

    get amount(): number {
        return this._amount;
    }

    get currency(): string {
        return this._currency;
    }

    private isValidAmount(): boolean {
        return this._amount >= 0;
    }

    equals(other: Money): boolean {
        return other instanceof Money && this._amount === other._amount && this._currency === other._currency;
    }
}
