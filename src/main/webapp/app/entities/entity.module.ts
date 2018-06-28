import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CellaCustomerModule } from './customer/customer.module';
import { CellaSiteModule } from './site/site.module';
import { CellaProducerModule } from './producer/producer.module';
import { CellaInventoryCategoryModule } from './inventory-category/inventory-category.module';
import { CellaInventoryModule } from './inventory/inventory.module';
import { CellaWarehouseModule } from './warehouse/warehouse.module';
import { CellaWarehouseHandlingModule } from './warehouse-handling/warehouse-handling.module';
import { CellaWarehouseHandlingItemsModule } from './warehouse-handling-items/warehouse-handling-items.module';
import { CellaUnitMeasureModule } from './unit-measure/unit-measure.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        CellaCustomerModule,
        CellaSiteModule,
        CellaProducerModule,
        CellaInventoryCategoryModule,
        CellaInventoryModule,
        CellaWarehouseModule,
        CellaWarehouseHandlingModule,
        CellaWarehouseHandlingItemsModule,
        CellaUnitMeasureModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CellaEntityModule {}
