import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IInventoryCategory } from 'app/shared/model/inventory-category.model';

type EntityResponseType = HttpResponse<IInventoryCategory>;
type EntityArrayResponseType = HttpResponse<IInventoryCategory[]>;

@Injectable({ providedIn: 'root' })
export class InventoryCategoryService {
    private resourceUrl = SERVER_API_URL + 'api/inventory-categories';

    constructor(private http: HttpClient) {}

    create(inventoryCategory: IInventoryCategory): Observable<EntityResponseType> {
        return this.http.post<IInventoryCategory>(this.resourceUrl, inventoryCategory, { observe: 'response' });
    }

    update(inventoryCategory: IInventoryCategory): Observable<EntityResponseType> {
        return this.http.put<IInventoryCategory>(this.resourceUrl, inventoryCategory, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IInventoryCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IInventoryCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
