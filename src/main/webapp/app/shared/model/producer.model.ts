export interface IProducer {
    id?: number;
    name?: string;
}

export class Producer implements IProducer {
    constructor(public id?: number, public name?: string) {}
}
