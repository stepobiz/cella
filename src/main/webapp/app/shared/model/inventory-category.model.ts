export interface IInventoryCategory {
    id?: number;
    name?: string;
}

export class InventoryCategory implements IInventoryCategory {
    constructor(public id?: number, public name?: string) {}
}
