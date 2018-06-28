/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CellaTestModule } from '../../../test.module';
import { WarehouseHandlingItemsDeleteDialogComponent } from 'app/entities/warehouse-handling-items/warehouse-handling-items-delete-dialog.component';
import { WarehouseHandlingItemsService } from 'app/entities/warehouse-handling-items/warehouse-handling-items.service';

describe('Component Tests', () => {
    describe('WarehouseHandlingItems Management Delete Component', () => {
        let comp: WarehouseHandlingItemsDeleteDialogComponent;
        let fixture: ComponentFixture<WarehouseHandlingItemsDeleteDialogComponent>;
        let service: WarehouseHandlingItemsService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CellaTestModule],
                declarations: [WarehouseHandlingItemsDeleteDialogComponent]
            })
                .overrideTemplate(WarehouseHandlingItemsDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(WarehouseHandlingItemsDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WarehouseHandlingItemsService);
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
