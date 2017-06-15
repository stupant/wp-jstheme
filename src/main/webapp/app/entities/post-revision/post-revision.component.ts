import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { PostRevision } from './post-revision.model';
import { PostRevisionService } from './post-revision.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-post-revision',
    templateUrl: './post-revision.component.html'
})
export class PostRevisionComponent implements OnInit, OnDestroy {
postRevisions: PostRevision[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private postRevisionService: PostRevisionService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.postRevisionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.postRevisions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInPostRevisions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: PostRevision) {
        return item.id;
    }
    registerChangeInPostRevisions() {
        this.eventSubscriber = this.eventManager.subscribe('postRevisionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
