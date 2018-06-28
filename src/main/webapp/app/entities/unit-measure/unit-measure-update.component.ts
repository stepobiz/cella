import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IUnitMeasure } from 'app/shared/model/unit-measure.model';
import { UnitMeasureService } from './unit-measure.service';

@Component({
    selector: 'jhi-unit-measure-update',
    templateUrl: './unit-measure-update.component.html'
})
export class UnitMeasureUpdateComponent implements OnInit {
    private _unitMeasure: IUnitMeasure;
    isSaving: boolean;

    constructor(private unitMeasureService: UnitMeasureService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ unitMeasure }) => {
            this.unitMeasure = unitMeasure;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.unitMeasure.id !== undefined) {
            this.subscribeToSaveResponse(this.unitMeasureService.update(this.unitMeasure));
        } else {
            this.subscribeToSaveResponse(this.unitMeasureService.create(this.unitMeasure));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IUnitMeasure>>) {
        result.subscribe((res: HttpResponse<IUnitMeasure>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get unitMeasure() {
        return this._unitMeasure;
    }

    set unitMeasure(unitMeasure: IUnitMeasure) {
        this._unitMeasure = unitMeasure;
    }
}
