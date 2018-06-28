/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CellaTestModule } from '../../../test.module';
import { WarehouseHandlingDetailComponent } from 'app/entities/warehouse-handling/warehouse-handling-detail.component';
import { WarehouseHandling } from 'app/shared/model/warehouse-handling.model';

describe('Component Tests', () => {
    describe('WarehouseHandling Management Detail Component', () => {
        let comp: WarehouseHandlingDetailComponent;
        let fixture: ComponentFixture<WarehouseHandlingDetailComponent>;
        const route = ({ data: of({ warehouseHandling: new WarehouseHandling(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CellaTestModule],
                declarations: [WarehouseHandlingDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(WarehouseHandlingDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WarehouseHandlingDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.warehouseHandling).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
