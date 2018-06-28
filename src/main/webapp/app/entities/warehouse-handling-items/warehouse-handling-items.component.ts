import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IWarehouseHandlingItems } from 'app/shared/model/warehouse-handling-items.model';
import { Principal } from 'app/core';
import { WarehouseHandlingItemsService } from './warehouse-handling-items.service';

@Component({
    selector: 'jhi-warehouse-handling-items',
    templateUrl: './warehouse-handling-items.component.html'
})
export class WarehouseHandlingItemsComponent implements OnInit, OnDestroy {
    warehouseHandlingItems: IWarehouseHandlingItems[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private warehouseHandlingItemsService: WarehouseHandlingItemsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.warehouseHandlingItemsService.query().subscribe(
            (res: HttpResponse<IWarehouseHandlingItems[]>) => {
                this.warehouseHandlingItems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInWarehouseHandlingItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IWarehouseHandlingItems) {
        return item.id;
    }

    registerChangeInWarehouseHandlingItems() {
        this.eventSubscriber = this.eventManager.subscribe('warehouseHandlingItemsListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
