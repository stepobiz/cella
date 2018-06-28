/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { CellaTestModule } from '../../../test.module';
import { ProducerComponent } from 'app/entities/producer/producer.component';
import { ProducerService } from 'app/entities/producer/producer.service';
import { Producer } from 'app/shared/model/producer.model';

describe('Component Tests', () => {
    describe('Producer Management Component', () => {
        let comp: ProducerComponent;
        let fixture: ComponentFixture<ProducerComponent>;
        let service: ProducerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CellaTestModule],
                declarations: [ProducerComponent],
                providers: []
            })
                .overrideTemplate(ProducerComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ProducerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProducerService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Producer(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.producers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
