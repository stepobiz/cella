import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWarehouseHandling } from 'app/shared/model/warehouse-handling.model';

type EntityResponseType = HttpResponse<IWarehouseHandling>;
type EntityArrayResponseType = HttpResponse<IWarehouseHandling[]>;

@Injectable({ providedIn: 'root' })
export class WarehouseHandlingService {
    private resourceUrl = SERVER_API_URL + 'api/warehouse-handlings';

    constructor(private http: HttpClient) {}

    create(warehouseHandling: IWarehouseHandling): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(warehouseHandling);
        return this.http
            .post<IWarehouseHandling>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    update(warehouseHandling: IWarehouseHandling): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(warehouseHandling);
        return this.http
            .put<IWarehouseHandling>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IWarehouseHandling>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertDateFromServer(res));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IWarehouseHandling[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(warehouseHandling: IWarehouseHandling): IWarehouseHandling {
        const copy: IWarehouseHandling = Object.assign({}, warehouseHandling, {
            date: warehouseHandling.date != null && warehouseHandling.date.isValid() ? warehouseHandling.date.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.date = res.body.date != null ? moment(res.body.date) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((warehouseHandling: IWarehouseHandling) => {
            warehouseHandling.date = warehouseHandling.date != null ? moment(warehouseHandling.date) : null;
        });
        return res;
    }
}
