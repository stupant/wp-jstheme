import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { PostRevision } from './post-revision.model';
import { PostRevisionService } from './post-revision.service';

@Component({
    selector: 'jhi-post-revision-detail',
    templateUrl: './post-revision-detail.component.html'
})
export class PostRevisionDetailComponent implements OnInit, OnDestroy {

    postRevision: PostRevision;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private postRevisionService: PostRevisionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPostRevisions();
    }

    load(id) {
        this.postRevisionService.find(id).subscribe((postRevision) => {
            this.postRevision = postRevision;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPostRevisions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'postRevisionListModification',
            (response) => this.load(this.postRevision.id)
        );
    }
}
