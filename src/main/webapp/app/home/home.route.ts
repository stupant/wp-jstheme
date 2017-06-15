import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { HomeComponent, AboutComponent } from './';

export const HOME_ROUTE: Route[] = [
    {
        path: '',
        component: HomeComponent,
        data: {
            authorities: [],
            pageTitle: 'home.title'
        }
    }, {
        path: 'about-us',
        component: AboutComponent,
        data: {
            authorities: [],
            pageTitle: 'home.about'
        }
    }
];
