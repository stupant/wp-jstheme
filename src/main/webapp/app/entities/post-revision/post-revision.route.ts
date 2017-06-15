import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { PostRevisionComponent } from './post-revision.component';
import { PostRevisionDetailComponent } from './post-revision-detail.component';
import { PostRevisionPopupComponent } from './post-revision-dialog.component';
import { PostRevisionDeletePopupComponent } from './post-revision-delete-dialog.component';

import { Principal } from '../../shared';

export const postRevisionRoute: Routes = [
    {
        path: 'post-revision',
        component: PostRevisionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhuApp.postRevision.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'post-revision/:id',
        component: PostRevisionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhuApp.postRevision.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const postRevisionPopupRoute: Routes = [
    {
        path: 'post-revision-new',
        component: PostRevisionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhuApp.postRevision.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'post-revision/:id/edit',
        component: PostRevisionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhuApp.postRevision.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'post-revision/:id/delete',
        component: PostRevisionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhuApp.postRevision.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
