import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { PostRevision } from './post-revision.model';
import { PostRevisionPopupService } from './post-revision-popup.service';
import { PostRevisionService } from './post-revision.service';

@Component({
    selector: 'jhi-post-revision-dialog',
    templateUrl: './post-revision-dialog.component.html'
})
export class PostRevisionDialogComponent implements OnInit {

    postRevision: PostRevision;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private postRevisionService: PostRevisionService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.postRevision.id !== undefined) {
            this.subscribeToSaveResponse(
                this.postRevisionService.update(this.postRevision), false);
        } else {
            this.subscribeToSaveResponse(
                this.postRevisionService.create(this.postRevision), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<PostRevision>, isCreated: boolean) {
        result.subscribe((res: PostRevision) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: PostRevision, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'dhuApp.postRevision.created'
            : 'dhuApp.postRevision.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'postRevisionListModification', content: 'OK'});
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
    selector: 'jhi-post-revision-popup',
    template: ''
})
export class PostRevisionPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private postRevisionPopupService: PostRevisionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.postRevisionPopupService
                    .open(PostRevisionDialogComponent, params['id']);
            } else {
                this.modalRef = this.postRevisionPopupService
                    .open(PostRevisionDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
