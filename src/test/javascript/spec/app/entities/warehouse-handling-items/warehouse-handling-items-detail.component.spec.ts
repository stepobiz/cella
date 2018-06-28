/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CellaTestModule } from '../../../test.module';
import { WarehouseHandlingItemsDetailComponent } from 'app/entities/warehouse-handling-items/warehouse-handling-items-detail.component';
import { WarehouseHandlingItems } from 'app/shared/model/warehouse-handling-items.model';

describe('Component Tests', () => {
    describe('WarehouseHandlingItems Management Detail Component', () => {
        let comp: WarehouseHandlingItemsDetailComponent;
        let fixture: ComponentFixture<WarehouseHandlingItemsDetailComponent>;
        const route = ({ data: of({ warehouseHandlingItems: new WarehouseHandlingItems(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CellaTestModule],
                declarations: [WarehouseHandlingItemsDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WarehouseHandlingItemsDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WarehouseHandlingItemsDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.warehouseHandlingItems).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
