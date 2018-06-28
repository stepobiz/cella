import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ISite } from 'app/shared/model/site.model';
import { SiteService } from './site.service';
import { ICustomer } from 'app/shared/model/customer.model';
import { CustomerService } from 'app/entities/customer';

@Component({
    selector: 'jhi-site-update',
    templateUrl: './site-update.component.html'
})
export class SiteUpdateComponent implements OnInit {
    private _site: ISite;
    isSaving: boolean;

    customers: ICustomer[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private siteService: SiteService,
        private customerService: CustomerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ site }) => {
            this.site = site;
        });
        this.customerService.query().subscribe(
            (res: HttpResponse<ICustomer[]>) => {
                this.customers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.site.id !== undefined) {
            this.subscribeToSaveResponse(this.siteService.update(this.site));
        } else {
            this.subscribeToSaveResponse(this.siteService.create(this.site));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ISite>>) {
        result.subscribe((res: HttpResponse<ISite>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackCustomerById(index: number, item: ICustomer) {
        return item.id;
    }
    get site() {
        return this._site;
    }

    set site(site: ISite) {
        this._site = site;
    }
}
