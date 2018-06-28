import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { UnitMeasure } from 'app/shared/model/unit-measure.model';
import { UnitMeasureService } from './unit-measure.service';
import { UnitMeasureComponent } from './unit-measure.component';
import { UnitMeasureDetailComponent } from './unit-measure-detail.component';
import { UnitMeasureUpdateComponent } from './unit-measure-update.component';
import { UnitMeasureDeletePopupComponent } from './unit-measure-delete-dialog.component';
import { IUnitMeasure } from 'app/shared/model/unit-measure.model';

@Injectable({ providedIn: 'root' })
export class UnitMeasureResolve implements Resolve<IUnitMeasure> {
    constructor(private service: UnitMeasureService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((unitMeasure: HttpResponse<UnitMeasure>) => unitMeasure.body);
        }
        return Observable.of(new UnitMeasure());
    }
}

export const unitMeasureRoute: Routes = [
    {
        path: 'unit-measure',
        component: UnitMeasureComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.unitMeasure.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'unit-measure/:id/view',
        component: UnitMeasureDetailComponent,
        resolve: {
            unitMeasure: UnitMeasureResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.unitMeasure.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'unit-measure/new',
        component: UnitMeasureUpdateComponent,
        resolve: {
            unitMeasure: UnitMeasureResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.unitMeasure.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'unit-measure/:id/edit',
        component: UnitMeasureUpdateComponent,
        resolve: {
            unitMeasure: UnitMeasureResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.unitMeasure.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const unitMeasurePopupRoute: Routes = [
    {
        path: 'unit-measure/:id/delete',
        component: UnitMeasureDeletePopupComponent,
        resolve: {
            unitMeasure: UnitMeasureResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.unitMeasure.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
