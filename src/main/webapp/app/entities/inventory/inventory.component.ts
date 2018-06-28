import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInventory } from 'app/shared/model/inventory.model';
import { Principal } from 'app/core';
import { InventoryService } from './inventory.service';

@Component({
    selector: 'jhi-inventory',
    templateUrl: './inventory.component.html'
})
export class InventoryComponent implements OnInit, OnDestroy {
    inventories: IInventory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private inventoryService: InventoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.inventoryService.query().subscribe(
            (res: HttpResponse<IInventory[]>) => {
                this.inventories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInventories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInventory) {
        return item.id;
    }

    registerChangeInInventories() {
        this.eventSubscriber = this.eventManager.subscribe('inventoryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
