import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Posts } from './posts.model';
import { PostsPopupService } from './posts-popup.service';
import { PostsService } from './posts.service';

@Component({
    selector: 'jhi-posts-delete-dialog',
    templateUrl: './posts-delete-dialog.component.html'
})
export class PostsDeleteDialogComponent {

    posts: Posts;

    constructor(
        private postsService: PostsService,
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private eventManager: EventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.postsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'postsListModification',
                content: 'Deleted an posts'
            });
            this.activeModal.dismiss(true);
        });
        this.alertService.success('dhuApp.posts.deleted', { param : id }, null);
    }
}

@Component({
    selector: 'jhi-posts-delete-popup',
    template: ''
})
export class PostsDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private postsPopupService: PostsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.postsPopupService
                .open(PostsDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
