import { Moment } from 'moment';
import { IWarehouse } from 'app/shared/model//warehouse.model';
import { ISite } from 'app/shared/model//site.model';

export const enum WarehouseHandlingType {
    Provision = 'Provision',
    Exhaust = 'Exhaust'
}

export interface IWarehouseHandling {
    id?: number;
    date?: Moment;
    warehouseHandlingType?: WarehouseHandlingType;
    warehouseHandling?: IWarehouse;
    warehouseHandling?: ISite;
}

export class WarehouseHandling implements IWarehouseHandling {
    constructor(
        public id?: number,
        public date?: Moment,
        public warehouseHandlingType?: WarehouseHandlingType,
        public warehouseHandling?: IWarehouse,
        public warehouseHandling?: ISite
    ) {}
}
