import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProducer } from 'app/shared/model/producer.model';
import { ProducerService } from './producer.service';

@Component({
    selector: 'jhi-producer-update',
    templateUrl: './producer-update.component.html'
})
export class ProducerUpdateComponent implements OnInit {
    private _producer: IProducer;
    isSaving: boolean;

    constructor(private producerService: ProducerService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ producer }) => {
            this.producer = producer;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.producer.id !== undefined) {
            this.subscribeToSaveResponse(this.producerService.update(this.producer));
        } else {
            this.subscribeToSaveResponse(this.producerService.create(this.producer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IProducer>>) {
        result.subscribe((res: HttpResponse<IProducer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get producer() {
        return this._producer;
    }

    set producer(producer: IProducer) {
        this._producer = producer;
    }
}
