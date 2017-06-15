import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { PostRevision } from './post-revision.model';
import { PostRevisionPopupService } from './post-revision-popup.service';
import { PostRevisionService } from './post-revision.service';

@Component({
    selector: 'jhi-post-revision-delete-dialog',
    templateUrl: './post-revision-delete-dialog.component.html'
})
export class PostRevisionDeleteDialogComponent {

    postRevision: PostRevision;

    constructor(
        private postRevisionService: PostRevisionService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.postRevisionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'postRevisionListModification',
                content: 'Deleted an postRevision'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('dhuApp.postRevision.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-post-revision-delete-popup',
    template: ''
})
export class PostRevisionDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private postRevisionPopupService: PostRevisionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.postRevisionPopupService
                .open(PostRevisionDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
