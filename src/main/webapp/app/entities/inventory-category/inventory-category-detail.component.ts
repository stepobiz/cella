import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IInventoryCategory } from 'app/shared/model/inventory-category.model';

@Component({
    selector: 'jhi-inventory-category-detail',
    templateUrl: './inventory-category-detail.component.html'
})
export class InventoryCategoryDetailComponent implements OnInit {
    inventoryCategory: IInventoryCategory;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ inventoryCategory }) => {
            this.inventoryCategory = inventoryCategory;
        });
    }

    previousState() {
        window.history.back();
    }
}
