import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWarehouseHandlingItems } from 'app/shared/model/warehouse-handling-items.model';
import { WarehouseHandlingItemsService } from './warehouse-handling-items.service';

@Component({
    selector: 'jhi-warehouse-handling-items-delete-dialog',
    templateUrl: './warehouse-handling-items-delete-dialog.component.html'
})
export class WarehouseHandlingItemsDeleteDialogComponent {
    warehouseHandlingItems: IWarehouseHandlingItems;

    constructor(
        private warehouseHandlingItemsService: WarehouseHandlingItemsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.warehouseHandlingItemsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'warehouseHandlingItemsListModification',
                content: 'Deleted an warehouseHandlingItems'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-warehouse-handling-items-delete-popup',
    template: ''
})
export class WarehouseHandlingItemsDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ warehouseHandlingItems }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(WarehouseHandlingItemsDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.warehouseHandlingItems = warehouseHandlingItems;
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
