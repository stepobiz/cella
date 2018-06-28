/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CellaTestModule } from '../../../test.module';
import { InventoryCategoryDeleteDialogComponent } from 'app/entities/inventory-category/inventory-category-delete-dialog.component';
import { InventoryCategoryService } from 'app/entities/inventory-category/inventory-category.service';

describe('Component Tests', () => {
    describe('InventoryCategory Management Delete Component', () => {
        let comp: InventoryCategoryDeleteDialogComponent;
        let fixture: ComponentFixture<InventoryCategoryDeleteDialogComponent>;
        let service: InventoryCategoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CellaTestModule],
                declarations: [InventoryCategoryDeleteDialogComponent]
            })
                .overrideTemplate(InventoryCategoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InventoryCategoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InventoryCategoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
