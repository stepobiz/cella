import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProducer } from 'app/shared/model/producer.model';

@Component({
    selector: 'jhi-producer-detail',
    templateUrl: './producer-detail.component.html'
})
export class ProducerDetailComponent implements OnInit {
    producer: IProducer;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ producer }) => {
            this.producer = producer;
        });
    }

    previousState() {
        window.history.back();
    }
}
