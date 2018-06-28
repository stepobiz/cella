/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CellaTestModule } from '../../../test.module';
import { WarehouseHandlingComponent } from 'app/entities/warehouse-handling/warehouse-handling.component';
import { WarehouseHandlingService } from 'app/entities/warehouse-handling/warehouse-handling.service';
import { WarehouseHandling } from 'app/shared/model/warehouse-handling.model';

describe('Component Tests', () => {
    describe('WarehouseHandling Management Component', () => {
        let comp: WarehouseHandlingComponent;
        let fixture: ComponentFixture<WarehouseHandlingComponent>;
        let service: WarehouseHandlingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CellaTestModule],
                declarations: [WarehouseHandlingComponent],
                providers: []
            })
                .overrideTemplate(WarehouseHandlingComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WarehouseHandlingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseHandlingService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new WarehouseHandling(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.warehouseHandlings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
