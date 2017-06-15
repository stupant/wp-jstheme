import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager } from 'ng-jhipster';
import { ResponseWrapper } from '../shared';

import { Account, LoginModalService, Principal } from '../shared';
import { PageService, Page } from '../entities/page';
@Component({
    selector: 'jhi-home',
    templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;
    content: Page;
    constructor(
        private eventManager: EventManager,
        public page: PageService,
    ) {
      this.content = new Page();
    }

    ngOnInit() {
        this.page.query({ slug: 'about-us' }).subscribe((res: ResponseWrapper) => {
            console.log('Got page about-us', res);
            this.content = res.json[0];
        }, (err) => console.error(err));
    }
}
