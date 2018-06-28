/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CellaTestModule } from '../../../test.module';
import { WarehouseHandlingItemsUpdateComponent } from 'app/entities/warehouse-handling-items/warehouse-handling-items-update.component';
import { WarehouseHandlingItemsService } from 'app/entities/warehouse-handling-items/warehouse-handling-items.service';
import { WarehouseHandlingItems } from 'app/shared/model/warehouse-handling-items.model';

describe('Component Tests', () => {
    describe('WarehouseHandlingItems Management Update Component', () => {
        let comp: WarehouseHandlingItemsUpdateComponent;
        let fixture: ComponentFixture<WarehouseHandlingItemsUpdateComponent>;
        let service: WarehouseHandlingItemsService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CellaTestModule],
                declarations: [WarehouseHandlingItemsUpdateComponent]
            })
                .overrideTemplate(WarehouseHandlingItemsUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WarehouseHandlingItemsUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseHandlingItemsService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new WarehouseHandlingItems(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.warehouseHandlingItems = entity;
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
                    const entity = new WarehouseHandlingItems();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.warehouseHandlingItems = entity;
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
