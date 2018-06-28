import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IInventory } from 'app/shared/model/inventory.model';
import { InventoryService } from './inventory.service';
import { IUnitMeasure } from 'app/shared/model/unit-measure.model';
import { UnitMeasureService } from 'app/entities/unit-measure';
import { IInventoryCategory } from 'app/shared/model/inventory-category.model';
import { InventoryCategoryService } from 'app/entities/inventory-category';
import { IProducer } from 'app/shared/model/producer.model';
import { ProducerService } from 'app/entities/producer';

@Component({
    selector: 'jhi-inventory-update',
    templateUrl: './inventory-update.component.html'
})
export class InventoryUpdateComponent implements OnInit {
    private _inventory: IInventory;
    isSaving: boolean;

    unitmeasures: IUnitMeasure[];

    inventorycategories: IInventoryCategory[];

    producers: IProducer[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private inventoryService: InventoryService,
        private unitMeasureService: UnitMeasureService,
        private inventoryCategoryService: InventoryCategoryService,
        private producerService: ProducerService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ inventory }) => {
            this.inventory = inventory;
        });
        this.unitMeasureService.query().subscribe(
            (res: HttpResponse<IUnitMeasure[]>) => {
                this.unitmeasures = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.inventoryCategoryService.query().subscribe(
            (res: HttpResponse<IInventoryCategory[]>) => {
                this.inventorycategories = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.producerService.query().subscribe(
            (res: HttpResponse<IProducer[]>) => {
                this.producers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.inventory.id !== undefined) {
            this.subscribeToSaveResponse(this.inventoryService.update(this.inventory));
        } else {
            this.subscribeToSaveResponse(this.inventoryService.create(this.inventory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInventory>>) {
        result.subscribe((res: HttpResponse<IInventory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUnitMeasureById(index: number, item: IUnitMeasure) {
        return item.id;
    }

    trackInventoryCategoryById(index: number, item: IInventoryCategory) {
        return item.id;
    }

    trackProducerById(index: number, item: IProducer) {
        return item.id;
    }
    get inventory() {
        return this._inventory;
    }

    set inventory(inventory: IInventory) {
        this._inventory = inventory;
    }
}
