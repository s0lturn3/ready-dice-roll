import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { LoginComponent } from './routes/auth/login/login.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { HomeComponent } from './routes/home/home.component';
import { MainHeaderComponent } from './shared/components/main-header/main-header.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { UserNotAuthenticatedComponent } from './shared/components/user-not-authenticated/user-not-authenticated.component';


export const routes: Routes = [
   { path: '', title: 'Ready, Dice, Roll!', component: HomeComponent },

   {
      path: 'manager',
      component: MainHeaderComponent,
      children: [
         { path: 'dashboard', title: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

         {
            path: 'campaigns',
            loadChildren: () => import('./routes/campanhas/campanhas.routes').then(r => r.CAMPANHAS_ROUTES),
            canActivate: [ AuthGuard ]
         },
      ],
      canActivate: [AuthGuard],
		canLoad: [AuthGuard]
   },

   { path: 'auth', title: 'Autenticação', component: LoginComponent, canActivate: [LoginGuard] },
   { path: 'not-authorized', component: UserNotAuthenticatedComponent },
   { path: '**', component: PageNotFoundComponent },
];
