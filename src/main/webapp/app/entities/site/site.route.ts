import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable } from 'rxjs';
import { Site } from 'app/shared/model/site.model';
import { SiteService } from './site.service';
import { SiteComponent } from './site.component';
import { SiteDetailComponent } from './site-detail.component';
import { SiteUpdateComponent } from './site-update.component';
import { SiteDeletePopupComponent } from './site-delete-dialog.component';
import { ISite } from 'app/shared/model/site.model';

@Injectable({ providedIn: 'root' })
export class SiteResolve implements Resolve<ISite> {
    constructor(private service: SiteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).map((site: HttpResponse<Site>) => site.body);
        }
        return Observable.of(new Site());
    }
}

export const siteRoute: Routes = [
    {
        path: 'site',
        component: SiteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.site.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'site/:id/view',
        component: SiteDetailComponent,
        resolve: {
            site: SiteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.site.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'site/new',
        component: SiteUpdateComponent,
        resolve: {
            site: SiteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.site.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'site/:id/edit',
        component: SiteUpdateComponent,
        resolve: {
            site: SiteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.site.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sitePopupRoute: Routes = [
    {
        path: 'site/:id/delete',
        component: SiteDeletePopupComponent,
        resolve: {
            site: SiteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'cellaApp.site.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
