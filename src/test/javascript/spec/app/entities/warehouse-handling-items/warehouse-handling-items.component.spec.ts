/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CellaTestModule } from '../../../test.module';
import { WarehouseHandlingItemsComponent } from 'app/entities/warehouse-handling-items/warehouse-handling-items.component';
import { WarehouseHandlingItemsService } from 'app/entities/warehouse-handling-items/warehouse-handling-items.service';
import { WarehouseHandlingItems } from 'app/shared/model/warehouse-handling-items.model';

describe('Component Tests', () => {
    describe('WarehouseHandlingItems Management Component', () => {
        let comp: WarehouseHandlingItemsComponent;
        let fixture: ComponentFixture<WarehouseHandlingItemsComponent>;
        let service: WarehouseHandlingItemsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CellaTestModule],
                declarations: [WarehouseHandlingItemsComponent],
                providers: []
            })
                .overrideTemplate(WarehouseHandlingItemsComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WarehouseHandlingItemsComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseHandlingItemsService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new WarehouseHandlingItems(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.warehouseHandlingItems[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
