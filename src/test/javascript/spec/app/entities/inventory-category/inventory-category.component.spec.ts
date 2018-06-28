/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CellaTestModule } from '../../../test.module';
import { InventoryCategoryComponent } from 'app/entities/inventory-category/inventory-category.component';
import { InventoryCategoryService } from 'app/entities/inventory-category/inventory-category.service';
import { InventoryCategory } from 'app/shared/model/inventory-category.model';

describe('Component Tests', () => {
    describe('InventoryCategory Management Component', () => {
        let comp: InventoryCategoryComponent;
        let fixture: ComponentFixture<InventoryCategoryComponent>;
        let service: InventoryCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CellaTestModule],
                declarations: [InventoryCategoryComponent],
                providers: []
            })
                .overrideTemplate(InventoryCategoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InventoryCategoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InventoryCategoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new InventoryCategory(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.inventoryCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
