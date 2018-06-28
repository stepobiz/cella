/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CellaTestModule } from '../../../test.module';
import { ProducerDetailComponent } from 'app/entities/producer/producer-detail.component';
import { Producer } from 'app/shared/model/producer.model';

describe('Component Tests', () => {
    describe('Producer Management Detail Component', () => {
        let comp: ProducerDetailComponent;
        let fixture: ComponentFixture<ProducerDetailComponent>;
        const route = ({ data: of({ producer: new Producer(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CellaTestModule],
                declarations: [ProducerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ProducerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ProducerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.producer).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
