/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { CellaTestModule } from '../../../test.module';
import { InventoryCategoryDetailComponent } from 'app/entities/inventory-category/inventory-category-detail.component';
import { InventoryCategory } from 'app/shared/model/inventory-category.model';

describe('Component Tests', () => {
    describe('InventoryCategory Management Detail Component', () => {
        let comp: InventoryCategoryDetailComponent;
        let fixture: ComponentFixture<InventoryCategoryDetailComponent>;
        const route = ({ data: of({ inventoryCategory: new InventoryCategory(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [CellaTestModule],
                declarations: [InventoryCategoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(InventoryCategoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(InventoryCategoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.inventoryCategory).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
