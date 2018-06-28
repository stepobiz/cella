/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CellaTestModule } from '../../../test.module';
import { InventoryCategoryUpdateComponent } from 'app/entities/inventory-category/inventory-category-update.component';
import { InventoryCategoryService } from 'app/entities/inventory-category/inventory-category.service';
import { InventoryCategory } from 'app/shared/model/inventory-category.model';

describe('Component Tests', () => {
    describe('InventoryCategory Management Update Component', () => {
        let comp: InventoryCategoryUpdateComponent;
        let fixture: ComponentFixture<InventoryCategoryUpdateComponent>;
        let service: InventoryCategoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CellaTestModule],
                declarations: [InventoryCategoryUpdateComponent]
            })
                .overrideTemplate(InventoryCategoryUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(InventoryCategoryUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InventoryCategoryService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new InventoryCategory(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.inventoryCategory = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new InventoryCategory();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.inventoryCategory = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
