import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , DataUtils } from 'ng-jhipster';

import { Page } from './page.model';
import { PageService } from './page.service';

@Component({
    selector: 'jhi-page-detail',
    templateUrl: './page-detail.component.html'
})
export class PageDetailComponent implements OnInit, OnDestroy {

    page: Page;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private dataUtils: DataUtils,
        private pageService: PageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPages();
    }

    load(id) {
        this.pageService.find(id).subscribe((page) => {
            this.page = page;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'pageListModification',
            (response) => this.load(this.page.id)
        );
    }
}
