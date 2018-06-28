import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Producer } from 'app/shared/model/producer.model';
import { ProducerService } from './producer.service';
import { ProducerComponent } from './producer.component';
import { ProducerDetailComponent } from './producer-detail.component';
import { ProducerUpdateComponent } from './producer-update.component';
import { ProducerDeletePopupComponent } from './producer-delete-dialog.component';
import { IProducer } from 'app/shared/model/producer.model';

@Injectable({ providedIn: 'root' })
export class ProducerResolve implements Resolve<IProducer> {
    constructor(private service: ProducerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((producer: HttpResponse<Producer>) => producer.body);
        }
        return Observable.of(new Producer());
    }
}

export const producerRoute: Routes = [
    {
        path: 'producer',
        component: ProducerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.producer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'producer/:id/view',
        component: ProducerDetailComponent,
        resolve: {
            producer: ProducerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.producer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'producer/new',
        component: ProducerUpdateComponent,
        resolve: {
            producer: ProducerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.producer.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'producer/:id/edit',
        component: ProducerUpdateComponent,
        resolve: {
            producer: ProducerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.producer.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const producerPopupRoute: Routes = [
    {
        path: 'producer/:id/delete',
        component: ProducerDeletePopupComponent,
        resolve: {
            producer: ProducerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.producer.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
