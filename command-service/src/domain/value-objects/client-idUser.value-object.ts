// src/domain/value-objects/client-idUser.value-object.ts
export class ClientIDUser {
    constructor(private readonly _value: number) {
        if (!this.isValidIDUser(Number(_value))) {
            throw new Error('Invalid Client ID');
        }
    }

    get value(): number {
        return this._value;
    }

    private isValidIDUser(id: number): boolean {
        return id > 0;
    }

    equals(other: ClientIDUser): boolean {
        return other instanceof ClientIDUser && this._value === other._value;
    }
}
