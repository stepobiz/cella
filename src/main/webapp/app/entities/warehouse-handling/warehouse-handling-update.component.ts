import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IWarehouseHandling } from 'app/shared/model/warehouse-handling.model';
import { WarehouseHandlingService } from './warehouse-handling.service';
import { IWarehouse } from 'app/shared/model/warehouse.model';
import { WarehouseService } from 'app/entities/warehouse';
import { ISite } from 'app/shared/model/site.model';
import { SiteService } from 'app/entities/site';

@Component({
    selector: 'jhi-warehouse-handling-update',
    templateUrl: './warehouse-handling-update.component.html'
})
export class WarehouseHandlingUpdateComponent implements OnInit {
    private _warehouseHandling: IWarehouseHandling;
    isSaving: boolean;

    warehouses: IWarehouse[];

    sites: ISite[];
    date: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private warehouseHandlingService: WarehouseHandlingService,
        private warehouseService: WarehouseService,
        private siteService: SiteService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ warehouseHandling }) => {
            this.warehouseHandling = warehouseHandling;
        });
        this.warehouseService.query().subscribe(
            (res: HttpResponse<IWarehouse[]>) => {
                this.warehouses = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.siteService.query().subscribe(
            (res: HttpResponse<ISite[]>) => {
                this.sites = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.warehouseHandling.date = moment(this.date, DATE_TIME_FORMAT);
        if (this.warehouseHandling.id !== undefined) {
            this.subscribeToSaveResponse(this.warehouseHandlingService.update(this.warehouseHandling));
        } else {
            this.subscribeToSaveResponse(this.warehouseHandlingService.create(this.warehouseHandling));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWarehouseHandling>>) {
        result.subscribe((res: HttpResponse<IWarehouseHandling>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackWarehouseById(index: number, item: IWarehouse) {
        return item.id;
    }

    trackSiteById(index: number, item: ISite) {
        return item.id;
    }
    get warehouseHandling() {
        return this._warehouseHandling;
    }

    set warehouseHandling(warehouseHandling: IWarehouseHandling) {
        this._warehouseHandling = warehouseHandling;
        this.date = moment(warehouseHandling.date).format(DATE_TIME_FORMAT);
    }
}
