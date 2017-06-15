import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PostRevision } from './post-revision.model';
import { PostRevisionService } from './post-revision.service';

@Injectable()
export class PostRevisionPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private postRevisionService: PostRevisionService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.postRevisionService.find(id).subscribe((postRevision) => {
                this.postRevisionModalRef(component, postRevision);
            });
        } else {
            return this.postRevisionModalRef(component, new PostRevision());
        }
    }

    postRevisionModalRef(component: Component, postRevision: PostRevision): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.postRevision = postRevision;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
