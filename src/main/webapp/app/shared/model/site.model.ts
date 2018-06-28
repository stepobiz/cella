import { ICustomer } from 'app/shared/model//customer.model';

export const enum SiteStatus {
    Open = 'Open',
    Close = 'Close'
}

export interface ISite {
    id?: number;
    description?: string;
    siteStatus?: SiteStatus;
    site?: ICustomer;
}

export class Site implements ISite {
    constructor(public id?: number, public description?: string, public siteStatus?: SiteStatus, public site?: ICustomer) {}
}
