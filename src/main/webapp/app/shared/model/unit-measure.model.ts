export interface IUnitMeasure {
    id?: number;
    description?: string;
}

export class UnitMeasure implements IUnitMeasure {
    constructor(public id?: number, public description?: string) {}
}
