// src/domain/value-objects/client-id.value-object.ts
export class ClientID {
    constructor(private readonly _value: string) {
        if (!this.isValidID(_value)) {
            throw new Error('Invalid Client ID');
        }
    }

    get value(): string {
        return this._value;
    }

    private isValidID(id: string): boolean {
        return typeof id === 'string' && id.length > 0;
    }

    equals(other: ClientID): boolean {
        return other instanceof ClientID && this._value === other._value;
    }
}
