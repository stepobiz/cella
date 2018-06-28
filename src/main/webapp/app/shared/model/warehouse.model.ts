export interface IWarehouse {
    id?: number;
    name?: string;
}

export class Warehouse implements IWarehouse {
    constructor(public id?: number, public name?: string) {}
}
