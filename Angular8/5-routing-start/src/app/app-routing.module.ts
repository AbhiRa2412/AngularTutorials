import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server-resolver.service';


const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'users', component: UsersComponent,
        children: [
            { path: ':id/:name', component: UserComponent },
        ]
    },
    // { path: 'users/:id/:name', component: UserComponent },
    {
        path: 'servers',
        // canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: ServersComponent,
        children: [
            {
                path: ':id', component: ServerComponent,
                resolve: { server: ServerResolver }
            },
            { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    },
    //{ path: 'not-found', component: PageNotFoundComponent },
    { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
    //{ path: 'something', redirectTo: '/not-found' }, //it will wokr only if not-found was typed.
    //this will work for the string or url which is not found will redirect to this
    { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
    //{ path: '', redirectTo: '/', pathMatch: 'full' }
    // { path: 'servers/:id', component: ServerComponent },
    // { path: 'servers/:id/edit', component: EditServerComponent }
];

@NgModule({
    imports: [
        // RouterModule.forRoot(appRoutes, { useHash: true }),
        RouterModule.forRoot(appRoutes),
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {

}
