import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Inventory } from 'app/shared/model/inventory.model';
import { InventoryService } from './inventory.service';
import { InventoryComponent } from './inventory.component';
import { InventoryDetailComponent } from './inventory-detail.component';
import { InventoryUpdateComponent } from './inventory-update.component';
import { InventoryDeletePopupComponent } from './inventory-delete-dialog.component';
import { IInventory } from 'app/shared/model/inventory.model';

@Injectable({ providedIn: 'root' })
export class InventoryResolve implements Resolve<IInventory> {
    constructor(private service: InventoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((inventory: HttpResponse<Inventory>) => inventory.body);
        }
        return Observable.of(new Inventory());
    }
}

export const inventoryRoute: Routes = [
    {
        path: 'inventory',
        component: InventoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.inventory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'inventory/:id/view',
        component: InventoryDetailComponent,
        resolve: {
            inventory: InventoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.inventory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'inventory/new',
        component: InventoryUpdateComponent,
        resolve: {
            inventory: InventoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.inventory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'inventory/:id/edit',
        component: InventoryUpdateComponent,
        resolve: {
            inventory: InventoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.inventory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const inventoryPopupRoute: Routes = [
    {
        path: 'inventory/:id/delete',
        component: InventoryDeletePopupComponent,
        resolve: {
            inventory: InventoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.inventory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
