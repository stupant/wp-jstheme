import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TaxonomyComponent } from './taxonomy.component';
import { TaxonomyDetailComponent } from './taxonomy-detail.component';
import { TaxonomyPopupComponent } from './taxonomy-dialog.component';
import { TaxonomyDeletePopupComponent } from './taxonomy-delete-dialog.component';

import { Principal } from '../../shared';

export const taxonomyRoute: Routes = [
    {
        path: 'taxonomy',
        component: TaxonomyComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhuApp.taxonomy.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'taxonomy/:id',
        component: TaxonomyDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhuApp.taxonomy.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taxonomyPopupRoute: Routes = [
    {
        path: 'taxonomy-new',
        component: TaxonomyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhuApp.taxonomy.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'taxonomy/:id/edit',
        component: TaxonomyPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhuApp.taxonomy.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'taxonomy/:id/delete',
        component: TaxonomyDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhuApp.taxonomy.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
