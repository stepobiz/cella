import { IUnitMeasure } from 'app/shared/model//unit-measure.model';
import { IInventoryCategory } from 'app/shared/model//inventory-category.model';
import { IProducer } from 'app/shared/model//producer.model';

export interface IInventory {
    id?: number;
    name?: string;
    inventory?: IUnitMeasure;
    inventory?: IInventoryCategory;
    inventory?: IProducer;
}

export class Inventory implements IInventory {
    constructor(
        public id?: number,
        public name?: string,
        public inventory?: IUnitMeasure,
        public inventory?: IInventoryCategory,
        public inventory?: IProducer
    ) {}
}
