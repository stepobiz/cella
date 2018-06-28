export const enum CustomerType {
    Private = 'Private',
    Company = 'Company'
}

export interface ICustomer {
    id?: number;
    name?: string;
    customerType?: CustomerType;
}

export class Customer implements ICustomer {
    constructor(public id?: number, public name?: string, public customerType?: CustomerType) {}
}
