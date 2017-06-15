import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DhuSharedModule } from '../shared';

import { HOME_ROUTE, HomeComponent, AboutComponent } from './';

@NgModule({
    imports: [
        DhuSharedModule,
        RouterModule.forRoot(HOME_ROUTE, { useHash: true })
    ],
    declarations: [
        HomeComponent, AboutComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DhuHomeModule { }
