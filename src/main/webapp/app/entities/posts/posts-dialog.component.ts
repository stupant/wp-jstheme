import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, DataUtils } from 'ng-jhipster';

import { Posts } from './posts.model';
import { PostsPopupService } from './posts-popup.service';
import { PostsService } from './posts.service';

@Component({
    selector: 'jhi-posts-dialog',
    templateUrl: './posts-dialog.component.html'
})
export class PostsDialogComponent implements OnInit {

    posts: Posts;
    authorities: any[];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: DataUtils,
        private alertService: AlertService,
        private postsService: PostsService,
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

    setFileData(event, posts, field, isImage) {
        if (event && event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (isImage && !/^image\//.test(file.type)) {
                return;
            }
            this.dataUtils.toBase64(file, (base64Data) => {
                posts[field] = base64Data;
                posts[`${field}ContentType`] = file.type;
            });
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.posts.id !== undefined) {
            this.subscribeToSaveResponse(
                this.postsService.update(this.posts), false);
        } else {
            this.subscribeToSaveResponse(
                this.postsService.create(this.posts), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Posts>, isCreated: boolean) {
        result.subscribe((res: Posts) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Posts, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'dhuApp.posts.created'
            : 'dhuApp.posts.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'postsListModification', content: 'OK'});
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
    selector: 'jhi-posts-popup',
    template: ''
})
export class PostsPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private postsPopupService: PostsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.postsPopupService
                    .open(PostsDialogComponent, params['id']);
            } else {
                this.modalRef = this.postsPopupService
                    .open(PostsDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
