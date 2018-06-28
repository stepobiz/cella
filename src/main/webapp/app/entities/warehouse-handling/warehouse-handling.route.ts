import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { WarehouseHandling } from 'app/shared/model/warehouse-handling.model';
import { WarehouseHandlingService } from './warehouse-handling.service';
import { WarehouseHandlingComponent } from './warehouse-handling.component';
import { WarehouseHandlingDetailComponent } from './warehouse-handling-detail.component';
import { WarehouseHandlingUpdateComponent } from './warehouse-handling-update.component';
import { WarehouseHandlingDeletePopupComponent } from './warehouse-handling-delete-dialog.component';
import { IWarehouseHandling } from 'app/shared/model/warehouse-handling.model';

@Injectable({ providedIn: 'root' })
export class WarehouseHandlingResolve implements Resolve<IWarehouseHandling> {
    constructor(private service: WarehouseHandlingService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((warehouseHandling: HttpResponse<WarehouseHandling>) => warehouseHandling.body);
        }
        return Observable.of(new WarehouseHandling());
    }
}

export const warehouseHandlingRoute: Routes = [
    {
        path: 'warehouse-handling',
        component: WarehouseHandlingComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.warehouseHandling.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'warehouse-handling/:id/view',
        component: WarehouseHandlingDetailComponent,
        resolve: {
            warehouseHandling: WarehouseHandlingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.warehouseHandling.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'warehouse-handling/new',
        component: WarehouseHandlingUpdateComponent,
        resolve: {
            warehouseHandling: WarehouseHandlingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.warehouseHandling.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'warehouse-handling/:id/edit',
        component: WarehouseHandlingUpdateComponent,
        resolve: {
            warehouseHandling: WarehouseHandlingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.warehouseHandling.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const warehouseHandlingPopupRoute: Routes = [
    {
        path: 'warehouse-handling/:id/delete',
        component: WarehouseHandlingDeletePopupComponent,
        resolve: {
            warehouseHandling: WarehouseHandlingResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.warehouseHandling.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
