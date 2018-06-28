import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CellaSharedModule } from 'app/shared';
import {
    InventoryCategoryComponent,
    InventoryCategoryDetailComponent,
    InventoryCategoryUpdateComponent,
    InventoryCategoryDeletePopupComponent,
    InventoryCategoryDeleteDialogComponent,
    inventoryCategoryRoute,
    inventoryCategoryPopupRoute
} from './';

const ENTITY_STATES = [...inventoryCategoryRoute, ...inventoryCategoryPopupRoute];

@NgModule({
    imports: [CellaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InventoryCategoryComponent,
        InventoryCategoryDetailComponent,
        InventoryCategoryUpdateComponent,
        InventoryCategoryDeleteDialogComponent,
        InventoryCategoryDeletePopupComponent
    ],
    entryComponents: [
        InventoryCategoryComponent,
        InventoryCategoryUpdateComponent,
        InventoryCategoryDeleteDialogComponent,
        InventoryCategoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CellaInventoryCategoryModule {}
