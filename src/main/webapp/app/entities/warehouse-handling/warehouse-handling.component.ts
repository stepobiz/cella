import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWarehouseHandling } from 'app/shared/model/warehouse-handling.model';
import { Principal } from 'app/core';
import { WarehouseHandlingService } from './warehouse-handling.service';

@Component({
    selector: 'jhi-warehouse-handling',
    templateUrl: './warehouse-handling.component.html'
})
export class WarehouseHandlingComponent implements OnInit, OnDestroy {
    warehouseHandlings: IWarehouseHandling[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private warehouseHandlingService: WarehouseHandlingService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.warehouseHandlingService.query().subscribe(
            (res: HttpResponse<IWarehouseHandling[]>) => {
                this.warehouseHandlings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWarehouseHandlings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWarehouseHandling) {
        return item.id;
    }

    registerChangeInWarehouseHandlings() {
        this.eventSubscriber = this.eventManager.subscribe('warehouseHandlingListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
