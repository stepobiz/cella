import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IWarehouseHandlingItems } from 'app/shared/model/warehouse-handling-items.model';

type EntityResponseType = HttpResponse<IWarehouseHandlingItems>;
type EntityArrayResponseType = HttpResponse<IWarehouseHandlingItems[]>;

@Injectable({ providedIn: 'root' })
export class WarehouseHandlingItemsService {
    private resourceUrl = SERVER_API_URL + 'api/warehouse-handling-items';

    constructor(private http: HttpClient) {}

    create(warehouseHandlingItems: IWarehouseHandlingItems): Observable<EntityResponseType> {
        return this.http.post<IWarehouseHandlingItems>(this.resourceUrl, warehouseHandlingItems, { observe: 'response' });
    }

    update(warehouseHandlingItems: IWarehouseHandlingItems): Observable<EntityResponseType> {
        return this.http.put<IWarehouseHandlingItems>(this.resourceUrl, warehouseHandlingItems, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IWarehouseHandlingItems>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IWarehouseHandlingItems[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
