/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { CellaTestModule } from '../../../test.module';
import { ProducerDeleteDialogComponent } from 'app/entities/producer/producer-delete-dialog.component';
import { ProducerService } from 'app/entities/producer/producer.service';

describe('Component Tests', () => {
    describe('Producer Management Delete Component', () => {
        let comp: ProducerDeleteDialogComponent;
        let fixture: ComponentFixture<ProducerDeleteDialogComponent>;
        let service: ProducerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CellaTestModule],
                declarations: [ProducerDeleteDialogComponent]
            })
                .overrideTemplate(ProducerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProducerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProducerService);
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
