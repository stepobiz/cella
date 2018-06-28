import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IWarehouseHandlingItems } from 'app/shared/model/warehouse-handling-items.model';

@Component({
    selector: 'jhi-warehouse-handling-items-detail',
    templateUrl: './warehouse-handling-items-detail.component.html'
})
export class WarehouseHandlingItemsDetailComponent implements OnInit {
    warehouseHandlingItems: IWarehouseHandlingItems;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ warehouseHandlingItems }) => {
            this.warehouseHandlingItems = warehouseHandlingItems;
        });
    }

    previousState() {
        window.history.back();
    }
}
