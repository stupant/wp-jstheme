import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { PostsComponent } from './posts.component';
import { PostsDetailComponent } from './posts-detail.component';
import { PostsPopupComponent } from './posts-dialog.component';
import { PostsDeletePopupComponent } from './posts-delete-dialog.component';

import { Principal } from '../../shared';

export const postsRoute: Routes = [
    {
        path: 'posts',
        component: PostsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhuApp.posts.home.title'
        }
    }, {
        path: 'posts/:id',
        component: PostsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhuApp.posts.home.title'
        }
    }
];

export const postsPopupRoute: Routes = [
    {
        path: 'posts-new',
        component: PostsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhuApp.posts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'posts/:id/edit',
        component: PostsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhuApp.posts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'posts/:id/delete',
        component: PostsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'dhuApp.posts.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
