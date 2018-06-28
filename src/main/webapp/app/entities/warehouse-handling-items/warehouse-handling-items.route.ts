import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { WarehouseHandlingItems } from 'app/shared/model/warehouse-handling-items.model';
import { WarehouseHandlingItemsService } from './warehouse-handling-items.service';
import { WarehouseHandlingItemsComponent } from './warehouse-handling-items.component';
import { WarehouseHandlingItemsDetailComponent } from './warehouse-handling-items-detail.component';
import { WarehouseHandlingItemsUpdateComponent } from './warehouse-handling-items-update.component';
import { WarehouseHandlingItemsDeletePopupComponent } from './warehouse-handling-items-delete-dialog.component';
import { IWarehouseHandlingItems } from 'app/shared/model/warehouse-handling-items.model';

@Injectable({ providedIn: 'root' })
export class WarehouseHandlingItemsResolve implements Resolve<IWarehouseHandlingItems> {
    constructor(private service: WarehouseHandlingItemsService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((warehouseHandlingItems: HttpResponse<WarehouseHandlingItems>) => warehouseHandlingItems.body);
        }
        return Observable.of(new WarehouseHandlingItems());
    }
}

export const warehouseHandlingItemsRoute: Routes = [
    {
        path: 'warehouse-handling-items',
        component: WarehouseHandlingItemsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.warehouseHandlingItems.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'warehouse-handling-items/:id/view',
        component: WarehouseHandlingItemsDetailComponent,
        resolve: {
            warehouseHandlingItems: WarehouseHandlingItemsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.warehouseHandlingItems.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'warehouse-handling-items/new',
        component: WarehouseHandlingItemsUpdateComponent,
        resolve: {
            warehouseHandlingItems: WarehouseHandlingItemsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.warehouseHandlingItems.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'warehouse-handling-items/:id/edit',
        component: WarehouseHandlingItemsUpdateComponent,
        resolve: {
            warehouseHandlingItems: WarehouseHandlingItemsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.warehouseHandlingItems.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const warehouseHandlingItemsPopupRoute: Routes = [
    {
        path: 'warehouse-handling-items/:id/delete',
        component: WarehouseHandlingItemsDeletePopupComponent,
        resolve: {
            warehouseHandlingItems: WarehouseHandlingItemsResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.warehouseHandlingItems.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
