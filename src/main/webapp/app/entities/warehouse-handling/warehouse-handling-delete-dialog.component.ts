import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWarehouseHandling } from 'app/shared/model/warehouse-handling.model';
import { WarehouseHandlingService } from './warehouse-handling.service';

@Component({
    selector: 'jhi-warehouse-handling-delete-dialog',
    templateUrl: './warehouse-handling-delete-dialog.component.html'
})
export class WarehouseHandlingDeleteDialogComponent {
    warehouseHandling: IWarehouseHandling;

    constructor(
        private warehouseHandlingService: WarehouseHandlingService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.warehouseHandlingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'warehouseHandlingListModification',
                content: 'Deleted an warehouseHandling'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-warehouse-handling-delete-popup',
    template: ''
})
export class WarehouseHandlingDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ warehouseHandling }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(WarehouseHandlingDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.warehouseHandling = warehouseHandling;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
