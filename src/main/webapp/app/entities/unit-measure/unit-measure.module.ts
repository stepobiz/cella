import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CellaSharedModule } from 'app/shared';
import {
    UnitMeasureComponent,
    UnitMeasureDetailComponent,
    UnitMeasureUpdateComponent,
    UnitMeasureDeletePopupComponent,
    UnitMeasureDeleteDialogComponent,
    unitMeasureRoute,
    unitMeasurePopupRoute
} from './';

const ENTITY_STATES = [...unitMeasureRoute, ...unitMeasurePopupRoute];

@NgModule({
    imports: [CellaSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UnitMeasureComponent,
        UnitMeasureDetailComponent,
        UnitMeasureUpdateComponent,
        UnitMeasureDeleteDialogComponent,
        UnitMeasureDeletePopupComponent
    ],
    entryComponents: [UnitMeasureComponent, UnitMeasureUpdateComponent, UnitMeasureDeleteDialogComponent, UnitMeasureDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CellaUnitMeasureModule {}
