import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CellaSharedModule } from 'app/shared';
import {
    WarehouseHandlingComponent,
    WarehouseHandlingDetailComponent,
    WarehouseHandlingUpdateComponent,
    WarehouseHandlingDeletePopupComponent,
    WarehouseHandlingDeleteDialogComponent,
    warehouseHandlingRoute,
    warehouseHandlingPopupRoute
} from './';

const ENTITY_STATES = [...warehouseHandlingRoute, ...warehouseHandlingPopupRoute];

@NgModule({
    imports: [CellaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        WarehouseHandlingComponent,
        WarehouseHandlingDetailComponent,
        WarehouseHandlingUpdateComponent,
        WarehouseHandlingDeleteDialogComponent,
        WarehouseHandlingDeletePopupComponent
    ],
    entryComponents: [
        WarehouseHandlingComponent,
        WarehouseHandlingUpdateComponent,
        WarehouseHandlingDeleteDialogComponent,
        WarehouseHandlingDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CellaWarehouseHandlingModule {}
