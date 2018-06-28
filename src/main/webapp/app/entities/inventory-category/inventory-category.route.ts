import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { InventoryCategory } from 'app/shared/model/inventory-category.model';
import { InventoryCategoryService } from './inventory-category.service';
import { InventoryCategoryComponent } from './inventory-category.component';
import { InventoryCategoryDetailComponent } from './inventory-category-detail.component';
import { InventoryCategoryUpdateComponent } from './inventory-category-update.component';
import { InventoryCategoryDeletePopupComponent } from './inventory-category-delete-dialog.component';
import { IInventoryCategory } from 'app/shared/model/inventory-category.model';

@Injectable({ providedIn: 'root' })
export class InventoryCategoryResolve implements Resolve<IInventoryCategory> {
    constructor(private service: InventoryCategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((inventoryCategory: HttpResponse<InventoryCategory>) => inventoryCategory.body);
        }
        return Observable.of(new InventoryCategory());
    }
}

export const inventoryCategoryRoute: Routes = [
    {
        path: 'inventory-category',
        component: InventoryCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.inventoryCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'inventory-category/:id/view',
        component: InventoryCategoryDetailComponent,
        resolve: {
            inventoryCategory: InventoryCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.inventoryCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'inventory-category/new',
        component: InventoryCategoryUpdateComponent,
        resolve: {
            inventoryCategory: InventoryCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.inventoryCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'inventory-category/:id/edit',
        component: InventoryCategoryUpdateComponent,
        resolve: {
            inventoryCategory: InventoryCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.inventoryCategory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const inventoryCategoryPopupRoute: Routes = [
    {
        path: 'inventory-category/:id/delete',
        component: InventoryCategoryDeletePopupComponent,
        resolve: {
            inventoryCategory: InventoryCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.inventoryCategory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
