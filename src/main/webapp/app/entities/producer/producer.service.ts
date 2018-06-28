import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IProducer } from 'app/shared/model/producer.model';

type EntityResponseType = HttpResponse<IProducer>;
type EntityArrayResponseType = HttpResponse<IProducer[]>;

@Injectable({ providedIn: 'root' })
export class ProducerService {
    private resourceUrl = SERVER_API_URL + 'api/producers';

    constructor(private http: HttpClient) {}

    create(producer: IProducer): Observable<EntityResponseType> {
        return this.http.post<IProducer>(this.resourceUrl, producer, { observe: 'response' });
    }

    update(producer: IProducer): Observable<EntityResponseType> {
        return this.http.put<IProducer>(this.resourceUrl, producer, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IProducer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IProducer[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
