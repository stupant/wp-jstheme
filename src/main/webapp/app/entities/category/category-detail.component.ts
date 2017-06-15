import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager , DataUtils } from 'ng-jhipster';

import { Category } from './category.model';
import { CategoryService } from './category.service';
import { Posts, PostsService } from '../posts';

@Component({
    selector: 'jhi-category-detail',
    templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent implements OnInit, OnDestroy {

    category: Category;
    posts: Posts[];
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private dataUtils: DataUtils,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        public postService: PostsService,
    ) {
        this.posts = [];
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCategories();
    }

    load(id) {
        this.categoryService.find(id).subscribe((category) => {
            this.category = category;
            this.postService.query({ per_page: 20, page: 1, categories: id }).subscribe((posts) => this.posts = posts.json, (err) => console.log(err));
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

    registerChangeInCategories() {
        this.eventSubscriber = this.eventManager.subscribe(
            'categoryListModification',
            (response) => this.load(this.category.id)
        );
    }
}
