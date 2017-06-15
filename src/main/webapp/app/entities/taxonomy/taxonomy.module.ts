import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DhuSharedModule } from '../../shared';
import {
    TaxonomyService,
    TaxonomyPopupService,
    TaxonomyComponent,
    TaxonomyDetailComponent,
    TaxonomyDialogComponent,
    TaxonomyPopupComponent,
    TaxonomyDeletePopupComponent,
    TaxonomyDeleteDialogComponent,
    taxonomyRoute,
    taxonomyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...taxonomyRoute,
    ...taxonomyPopupRoute,
];

@NgModule({
    imports: [
        DhuSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TaxonomyComponent,
        TaxonomyDetailComponent,
        TaxonomyDialogComponent,
        TaxonomyDeleteDialogComponent,
        TaxonomyPopupComponent,
        TaxonomyDeletePopupComponent,
    ],
    entryComponents: [
        TaxonomyComponent,
        TaxonomyDialogComponent,
        TaxonomyPopupComponent,
        TaxonomyDeleteDialogComponent,
        TaxonomyDeletePopupComponent,
    ],
    providers: [
        TaxonomyService,
        TaxonomyPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DhuTaxonomyModule {}
