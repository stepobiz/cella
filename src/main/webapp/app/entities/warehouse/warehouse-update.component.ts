import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IWarehouse } from 'app/shared/model/warehouse.model';
import { WarehouseService } from './warehouse.service';

@Component({
    selector: 'jhi-warehouse-update',
    templateUrl: './warehouse-update.component.html'
})
export class WarehouseUpdateComponent implements OnInit {
    private _warehouse: IWarehouse;
    isSaving: boolean;

    constructor(private warehouseService: WarehouseService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ warehouse }) => {
            this.warehouse = warehouse;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.warehouse.id !== undefined) {
            this.subscribeToSaveResponse(this.warehouseService.update(this.warehouse));
        } else {
            this.subscribeToSaveResponse(this.warehouseService.create(this.warehouse));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IWarehouse>>) {
        result.subscribe((res: HttpResponse<IWarehouse>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get warehouse() {
        return this._warehouse;
    }

    set warehouse(warehouse: IWarehouse) {
        this._warehouse = warehouse;
    }
}
