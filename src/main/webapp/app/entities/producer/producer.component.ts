import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IProducer } from 'app/shared/model/producer.model';
import { Principal } from 'app/core';
import { ProducerService } from './producer.service';

@Component({
    selector: 'jhi-producer',
    templateUrl: './producer.component.html'
})
export class ProducerComponent implements OnInit, OnDestroy {
    producers: IProducer[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private producerService: ProducerService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.producerService.query().subscribe(
            (res: HttpResponse<IProducer[]>) => {
                this.producers = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProducers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IProducer) {
        return item.id;
    }

    registerChangeInProducers() {
        this.eventSubscriber = this.eventManager.subscribe('producerListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
