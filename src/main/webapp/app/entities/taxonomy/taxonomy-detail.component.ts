import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , DataUtils } from 'ng-jhipster';

import { Taxonomy } from './taxonomy.model';
import { TaxonomyService } from './taxonomy.service';

@Component({
    selector: 'jhi-taxonomy-detail',
    templateUrl: './taxonomy-detail.component.html'
})
export class TaxonomyDetailComponent implements OnInit, OnDestroy {

    taxonomy: Taxonomy;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private dataUtils: DataUtils,
        private taxonomyService: TaxonomyService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTaxonomies();
    }

    load(id) {
        this.taxonomyService.find(id).subscribe((taxonomy) => {
            this.taxonomy = taxonomy;
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

    registerChangeInTaxonomies() {
        this.eventSubscriber = this.eventManager.subscribe(
            'taxonomyListModification',
            (response) => this.load(this.taxonomy.id)
        );
    }
}
