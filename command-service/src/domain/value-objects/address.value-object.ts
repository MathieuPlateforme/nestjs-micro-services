export class Address {
    constructor(
        private readonly _id: string,
        private readonly _street: string,
        private readonly _city: string,
        private readonly _zipCode: string,
        private readonly _country: string
    ) {
        if (!this.isValidAddress()) {
            throw new Error('Invalid Address');
        }
    }

    get id(): string {
        return this._id;
    }

    get street(): string {
        return this._street;
    }

    get city(): string {
        return this._city;
    }

    get zipCode(): string {
        return this._zipCode;
    }

    get country(): string {
        return this._country;
    }

    private isValidAddress(): boolean {
        return (
            this._id && this._id.length > 0 &&
            this._street && this._street.length > 0 &&
            this._city && this._city.length > 0 &&
            this._zipCode && this._zipCode.length > 0 &&
            this._country && this._country.length > 0
        );
    }

    equals(other: Address): boolean {
        return (
            other instanceof Address &&
            this._id === other._id &&
            this._street === other._street &&
            this._city === other._city &&
            this._zipCode === other._zipCode &&
            this._country === other._country
        );
    }
}
