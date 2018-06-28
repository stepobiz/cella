import { IWarehouseHandling } from 'app/shared/model//warehouse-handling.model';
import { IInventory } from 'app/shared/model//inventory.model';

export interface IWarehouseHandlingItems {
    id?: number;
    quantity?: number;
    warehouseHandlingItems?: IWarehouseHandling;
    warehouseHandlingItems?: IInventory;
}

export class WarehouseHandlingItems implements IWarehouseHandlingItems {
    constructor(
        public id?: number,
        public quantity?: number,
        public warehouseHandlingItems?: IWarehouseHandling,
        public warehouseHandlingItems?: IInventory
    ) {}
}
