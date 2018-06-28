/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { CellaTestModule } from '../../../test.module';
import { WarehouseHandlingUpdateComponent } from 'app/entities/warehouse-handling/warehouse-handling-update.component';
import { WarehouseHandlingService } from 'app/entities/warehouse-handling/warehouse-handling.service';
import { WarehouseHandling } from 'app/shared/model/warehouse-handling.model';

describe('Component Tests', () => {
    describe('WarehouseHandling Management Update Component', () => {
        let comp: WarehouseHandlingUpdateComponent;
        let fixture: ComponentFixture<WarehouseHandlingUpdateComponent>;
        let service: WarehouseHandlingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CellaTestModule],
                declarations: [WarehouseHandlingUpdateComponent]
            })
                .overrideTemplate(WarehouseHandlingUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(WarehouseHandlingUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseHandlingService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new WarehouseHandling(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.warehouseHandling = entity;
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
                    const entity = new WarehouseHandling();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.warehouseHandling = entity;
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
