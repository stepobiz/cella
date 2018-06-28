import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IInventoryCategory } from 'app/shared/model/inventory-category.model';
import { InventoryCategoryService } from './inventory-category.service';

@Component({
    selector: 'jhi-inventory-category-update',
    templateUrl: './inventory-category-update.component.html'
})
export class InventoryCategoryUpdateComponent implements OnInit {
    private _inventoryCategory: IInventoryCategory;
    isSaving: boolean;

    constructor(private inventoryCategoryService: InventoryCategoryService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ inventoryCategory }) => {
            this.inventoryCategory = inventoryCategory;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.inventoryCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.inventoryCategoryService.update(this.inventoryCategory));
        } else {
            this.subscribeToSaveResponse(this.inventoryCategoryService.create(this.inventoryCategory));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IInventoryCategory>>) {
        result.subscribe((res: HttpResponse<IInventoryCategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get inventoryCategory() {
        return this._inventoryCategory;
    }

    set inventoryCategory(inventoryCategory: IInventoryCategory) {
        this._inventoryCategory = inventoryCategory;
    }
}
