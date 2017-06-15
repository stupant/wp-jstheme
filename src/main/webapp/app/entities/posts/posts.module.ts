import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DhuSharedModule } from '../../shared';
import {
    PostsService,
    PostsPopupService,
    PostsComponent,
    PostsDetailComponent,
    PostsDialogComponent,
    PostsPopupComponent,
    PostsDeletePopupComponent,
    PostsDeleteDialogComponent,
    postsRoute,
    postsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...postsRoute,
    ...postsPopupRoute,
];

@NgModule({
    imports: [
        DhuSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PostsComponent,
        PostsDetailComponent,
        PostsDialogComponent,
        PostsDeleteDialogComponent,
        PostsPopupComponent,
        PostsDeletePopupComponent,
    ],
    entryComponents: [
        PostsComponent,
        PostsDialogComponent,
        PostsPopupComponent,
        PostsDeleteDialogComponent,
        PostsDeletePopupComponent,
    ],
    providers: [
        PostsService,
        PostsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DhuPostsModule {}
