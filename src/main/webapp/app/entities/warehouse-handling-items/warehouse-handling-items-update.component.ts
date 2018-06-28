import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IWarehouseHandlingItems } from 'app/shared/model/warehouse-handling-items.model';
import { WarehouseHandlingItemsService } from './warehouse-handling-items.service';
import { IWarehouseHandling } from 'app/shared/model/warehouse-handling.model';
import { WarehouseHandlingService } from 'app/entities/warehouse-handling';
import { IInventory } from 'app/shared/model/inventory.model';
import { InventoryService } from 'app/entities/inventory';

@Component({
    selector: 'jhi-warehouse-handling-items-update',
    templateUrl: './warehouse-handling-items-update.component.html'
})
export class WarehouseHandlingItemsUpdateComponent implements OnInit {
    private _warehouseHandlingItems: IWarehouseHandlingItems;
    isSaving: boolean;

    warehousehandlings: IWarehouseHandling[];

    inventories: IInventory[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private warehouseHandlingItemsService: WarehouseHandlingItemsService,
        private warehouseHandlingService: WarehouseHandlingService,
        private inventoryService: InventoryService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ warehouseHandlingItems }) => {
            this.warehouseHandlingItems = warehouseHandlingItems;
        });
        this.warehouseHandlingService.query().subscribe(
            (res: HttpResponse<IWarehouseHandling[]>) => {
                this.warehousehandlings = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.inventoryService.query().subscribe(
            (res: HttpResponse<IInventory[]>) => {
                this.inventories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.warehouseHandlingItems.id !== undefined) {
            this.subscribeToSaveResponse(this.warehouseHandlingItemsService.update(this.warehouseHandlingItems));
        } else {
            this.subscribeToSaveResponse(this.warehouseHandlingItemsService.create(this.warehouseHandlingItems));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWarehouseHandlingItems>>) {
        result.subscribe(
            (res: HttpResponse<IWarehouseHandlingItems>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackWarehouseHandlingById(index: number, item: IWarehouseHandling) {
        return item.id;
    }

    trackInventoryById(index: number, item: IInventory) {
        return item.id;
    }
    get warehouseHandlingItems() {
        return this._warehouseHandlingItems;
    }

    set warehouseHandlingItems(warehouseHandlingItems: IWarehouseHandlingItems) {
        this._warehouseHandlingItems = warehouseHandlingItems;
    }
}
