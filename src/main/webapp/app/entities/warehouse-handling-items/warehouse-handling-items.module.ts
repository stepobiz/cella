import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CellaSharedModule } from 'app/shared';
import {
    WarehouseHandlingItemsComponent,
    WarehouseHandlingItemsDetailComponent,
    WarehouseHandlingItemsUpdateComponent,
    WarehouseHandlingItemsDeletePopupComponent,
    WarehouseHandlingItemsDeleteDialogComponent,
    warehouseHandlingItemsRoute,
    warehouseHandlingItemsPopupRoute
} from './';

const ENTITY_STATES = [...warehouseHandlingItemsRoute, ...warehouseHandlingItemsPopupRoute];

@NgModule({
    imports: [CellaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        WarehouseHandlingItemsComponent,
        WarehouseHandlingItemsDetailComponent,
        WarehouseHandlingItemsUpdateComponent,
        WarehouseHandlingItemsDeleteDialogComponent,
        WarehouseHandlingItemsDeletePopupComponent
    ],
    entryComponents: [
        WarehouseHandlingItemsComponent,
        WarehouseHandlingItemsUpdateComponent,
        WarehouseHandlingItemsDeleteDialogComponent,
        WarehouseHandlingItemsDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CellaWarehouseHandlingItemsModule {}
