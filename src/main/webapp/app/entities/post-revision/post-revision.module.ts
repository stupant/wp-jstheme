import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DhuSharedModule } from '../../shared';
import {
    PostRevisionService,
    PostRevisionPopupService,
    PostRevisionComponent,
    PostRevisionDetailComponent,
    PostRevisionDialogComponent,
    PostRevisionPopupComponent,
    PostRevisionDeletePopupComponent,
    PostRevisionDeleteDialogComponent,
    postRevisionRoute,
    postRevisionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...postRevisionRoute,
    ...postRevisionPopupRoute,
];

@NgModule({
    imports: [
        DhuSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PostRevisionComponent,
        PostRevisionDetailComponent,
        PostRevisionDialogComponent,
        PostRevisionDeleteDialogComponent,
        PostRevisionPopupComponent,
        PostRevisionDeletePopupComponent,
    ],
    entryComponents: [
        PostRevisionComponent,
        PostRevisionDialogComponent,
        PostRevisionPopupComponent,
        PostRevisionDeleteDialogComponent,
        PostRevisionDeletePopupComponent,
    ],
    providers: [
        PostRevisionService,
        PostRevisionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DhuPostRevisionModule {}
