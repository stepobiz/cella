import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISite } from 'app/shared/model/site.model';
import { Principal } from 'app/core';
import { SiteService } from './site.service';

@Component({
    selector: 'jhi-site',
    templateUrl: './site.component.html'
})
export class SiteComponent implements OnInit, OnDestroy {
    sites: ISite[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private siteService: SiteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.siteService.query().subscribe(
            (res: HttpResponse<ISite[]>) => {
                this.sites = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSites();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISite) {
        return item.id;
    }

    registerChangeInSites() {
        this.eventSubscriber = this.eventManager.subscribe('siteListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
