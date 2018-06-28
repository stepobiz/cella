import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWarehouseHandling } from 'app/shared/model/warehouse-handling.model';

@Component({
    selector: 'jhi-warehouse-handling-detail',
    templateUrl: './warehouse-handling-detail.component.html'
})
export class WarehouseHandlingDetailComponent implements OnInit {
    warehouseHandling: IWarehouseHandling;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ warehouseHandling }) => {
            this.warehouseHandling = warehouseHandling;
        });
    }

    previousState() {
        window.history.back();
    }
}
