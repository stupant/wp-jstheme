import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DhuSharedModule } from '../../shared';
import {
    PageService,
    PagePopupService,
    PageComponent,
    PageDetailComponent,
    PageDialogComponent,
    PagePopupComponent,
    PageDeletePopupComponent,
    PageDeleteDialogComponent,
    pageRoute,
    pagePopupRoute,
} from './';

const ENTITY_STATES = [
    ...pageRoute,
    ...pagePopupRoute,
];

@NgModule({
    imports: [
        DhuSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        PageComponent,
        PageDetailComponent,
        PageDialogComponent,
        PageDeleteDialogComponent,
        PagePopupComponent,
        PageDeletePopupComponent,
    ],
    entryComponents: [
        PageComponent,
        PageDialogComponent,
        PagePopupComponent,
        PageDeleteDialogComponent,
        PageDeletePopupComponent,
    ],
    providers: [
        PageService,
        PagePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DhuPageModule {}
