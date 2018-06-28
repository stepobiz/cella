import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IInventoryCategory } from 'app/shared/model/inventory-category.model';
import { Principal } from 'app/core';
import { InventoryCategoryService } from './inventory-category.service';

@Component({
    selector: 'jhi-inventory-category',
    templateUrl: './inventory-category.component.html'
})
export class InventoryCategoryComponent implements OnInit, OnDestroy {
    inventoryCategories: IInventoryCategory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private inventoryCategoryService: InventoryCategoryService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.inventoryCategoryService.query().subscribe(
            (res: HttpResponse<IInventoryCategory[]>) => {
                this.inventoryCategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInInventoryCategories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IInventoryCategory) {
        return item.id;
    }

    registerChangeInInventoryCategories() {
        this.eventSubscriber = this.eventManager.subscribe('inventoryCategoryListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
