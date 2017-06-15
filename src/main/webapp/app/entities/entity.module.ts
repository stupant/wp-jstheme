import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DhuPostsModule } from './posts/posts.module';
import { DhuPostRevisionModule } from './post-revision/post-revision.module';
import { DhuTagsModule } from './tags/tags.module';
import { DhuTaxonomyModule } from './taxonomy/taxonomy.module';
import { DhuPageModule } from './page/page.module';
import { DhuCategoryModule } from './category/category.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DhuPostsModule,
        DhuPostRevisionModule,
        DhuTagsModule,
        DhuTaxonomyModule,
        DhuPageModule,
        DhuCategoryModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DhuEntityModule {}
