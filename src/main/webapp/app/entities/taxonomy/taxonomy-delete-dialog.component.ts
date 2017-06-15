import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Taxonomy } from './taxonomy.model';
import { TaxonomyPopupService } from './taxonomy-popup.service';
import { TaxonomyService } from './taxonomy.service';

@Component({
    selector: 'jhi-taxonomy-delete-dialog',
    templateUrl: './taxonomy-delete-dialog.component.html'
})
export class TaxonomyDeleteDialogComponent {

    taxonomy: Taxonomy;

    constructor(
        private taxonomyService: TaxonomyService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.taxonomyService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'taxonomyListModification',
                content: 'Deleted an taxonomy'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('dhuApp.taxonomy.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-taxonomy-delete-popup',
    template: ''
})
export class TaxonomyDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taxonomyPopupService: TaxonomyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.taxonomyPopupService
                .open(TaxonomyDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
