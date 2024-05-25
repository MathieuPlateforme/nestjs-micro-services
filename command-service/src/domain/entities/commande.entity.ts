// src/domain/entities/commande.entity.ts
import { OrderID } from '../value-objects/order-id.value-object';
import { ClientID } from '../value-objects/client-id.value-object';
import { Address } from '../value-objects/address.value-object';
import { LigneCommande } from './ligne-commande.entity';

export class Commande {
    private _status: string;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(
        private readonly _id: OrderID,
        private readonly _clientId: ClientID,
        private readonly _deliveryAddress: Address,
        private _lines: LigneCommande[],
        status: string = 'Created',
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this._status = status;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    get id(): OrderID {
        return this._id;
    }

    get clientId(): ClientID {
        return this._clientId;
    }

    get deliveryAddress(): Address {
        return this._deliveryAddress;
    }

    get lines(): LigneCommande[] {
        return this._lines;
    }

    get status(): string {
        return this._status;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    changeStatus(newStatus: string): void {
        this._status = newStatus;
        this._updatedAt = new Date();
    }

    addLine(line: LigneCommande): void {
        this._lines.push(line);
        this._updatedAt = new Date();
    }

    removeLine(productId: string): void {
        this._lines = this._lines.filter(line => line.productId.value !== productId);
        this._updatedAt = new Date();
    }

    getTotal(): number {
        return this._lines.reduce((total, line) => total + line.price.amount * line.quantity, 0);
    }
}
