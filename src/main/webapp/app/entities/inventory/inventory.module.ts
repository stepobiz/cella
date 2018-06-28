import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CellaSharedModule } from 'app/shared';
import {
    InventoryComponent,
    InventoryDetailComponent,
    InventoryUpdateComponent,
    InventoryDeletePopupComponent,
    InventoryDeleteDialogComponent,
    inventoryRoute,
    inventoryPopupRoute
} from './';

const ENTITY_STATES = [...inventoryRoute, ...inventoryPopupRoute];

@NgModule({
    imports: [CellaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InventoryComponent,
        InventoryDetailComponent,
        InventoryUpdateComponent,
        InventoryDeleteDialogComponent,
        InventoryDeletePopupComponent
    ],
    entryComponents: [InventoryComponent, InventoryUpdateComponent, InventoryDeleteDialogComponent, InventoryDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CellaInventoryModule {}
