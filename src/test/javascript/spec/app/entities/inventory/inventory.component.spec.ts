/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CellaTestModule } from '../../../test.module';
import { InventoryComponent } from 'app/entities/inventory/inventory.component';
import { InventoryService } from 'app/entities/inventory/inventory.service';
import { Inventory } from 'app/shared/model/inventory.model';

describe('Component Tests', () => {
    describe('Inventory Management Component', () => {
        let comp: InventoryComponent;
        let fixture: ComponentFixture<InventoryComponent>;
        let service: InventoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CellaTestModule],
                declarations: [InventoryComponent],
                providers: []
            })
                .overrideTemplate(InventoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InventoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InventoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Inventory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.inventories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
