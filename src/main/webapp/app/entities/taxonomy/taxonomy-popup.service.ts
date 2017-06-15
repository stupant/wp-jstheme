import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Taxonomy } from './taxonomy.model';
import { TaxonomyService } from './taxonomy.service';

@Injectable()
export class TaxonomyPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private taxonomyService: TaxonomyService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.taxonomyService.find(id).subscribe((taxonomy) => {
                this.taxonomyModalRef(component, taxonomy);
            });
        } else {
            return this.taxonomyModalRef(component, new Taxonomy());
        }
    }

    taxonomyModalRef(component: Component, taxonomy: Taxonomy): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.taxonomy = taxonomy;
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
