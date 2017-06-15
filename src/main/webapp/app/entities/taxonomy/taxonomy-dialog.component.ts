import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, DataUtils } from 'ng-jhipster';

import { Taxonomy } from './taxonomy.model';
import { TaxonomyPopupService } from './taxonomy-popup.service';
import { TaxonomyService } from './taxonomy.service';

@Component({
    selector: 'jhi-taxonomy-dialog',
    templateUrl: './taxonomy-dialog.component.html'
})
export class TaxonomyDialogComponent implements OnInit {

    taxonomy: Taxonomy;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: DataUtils,
        private alertService: AlertService,
        private taxonomyService: TaxonomyService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, taxonomy, field, isImage) {
        if (event && event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (isImage && !/^image\//.test(file.type)) {
                return;
            }
            this.dataUtils.toBase64(file, (base64Data) => {
                taxonomy[field] = base64Data;
                taxonomy[`${field}ContentType`] = file.type;
            });
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.taxonomy.id !== undefined) {
            this.subscribeToSaveResponse(
                this.taxonomyService.update(this.taxonomy), false);
        } else {
            this.subscribeToSaveResponse(
                this.taxonomyService.create(this.taxonomy), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Taxonomy>, isCreated: boolean) {
        result.subscribe((res: Taxonomy) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Taxonomy, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'dhuApp.taxonomy.created'
            : 'dhuApp.taxonomy.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'taxonomyListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-taxonomy-popup',
    template: ''
})
export class TaxonomyPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private taxonomyPopupService: TaxonomyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.taxonomyPopupService
                    .open(TaxonomyDialogComponent, params['id']);
            } else {
                this.modalRef = this.taxonomyPopupService
                    .open(TaxonomyDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
