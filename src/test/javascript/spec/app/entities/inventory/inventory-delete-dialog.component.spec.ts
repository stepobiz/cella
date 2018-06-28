/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CellaTestModule } from '../../../test.module';
import { InventoryDeleteDialogComponent } from 'app/entities/inventory/inventory-delete-dialog.component';
import { InventoryService } from 'app/entities/inventory/inventory.service';

describe('Component Tests', () => {
    describe('Inventory Management Delete Component', () => {
        let comp: InventoryDeleteDialogComponent;
        let fixture: ComponentFixture<InventoryDeleteDialogComponent>;
        let service: InventoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CellaTestModule],
                declarations: [InventoryDeleteDialogComponent]
            })
                .overrideTemplate(InventoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InventoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(InventoryService);
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
