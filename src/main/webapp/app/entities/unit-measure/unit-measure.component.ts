import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUnitMeasure } from 'app/shared/model/unit-measure.model';
import { Principal } from 'app/core';
import { UnitMeasureService } from './unit-measure.service';

@Component({
    selector: 'jhi-unit-measure',
    templateUrl: './unit-measure.component.html'
})
export class UnitMeasureComponent implements OnInit, OnDestroy {
    unitMeasures: IUnitMeasure[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private unitMeasureService: UnitMeasureService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.unitMeasureService.query().subscribe(
            (res: HttpResponse<IUnitMeasure[]>) => {
                this.unitMeasures = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUnitMeasures();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUnitMeasure) {
        return item.id;
    }

    registerChangeInUnitMeasures() {
        this.eventSubscriber = this.eventManager.subscribe('unitMeasureListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
