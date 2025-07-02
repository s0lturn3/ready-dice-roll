import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginGuard } from './core/guards/login.guard';
import { LoginComponent } from './routes/auth/login/login.component';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { HomeComponent } from './routes/home/home.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { SideMenuComponent } from './shared/components/side-menu/side-menu.component';
import { UserNotAuthenticatedComponent } from './shared/components/user-not-authenticated/user-not-authenticated.component';


export const routes: Routes = [
   { path: 'inicio', title: 'Ready, Dice, Roll!', component: HomeComponent },

   {
      path: '',
      component: SideMenuComponent,
      children: [
         { path: 'dashboard', title: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },

         {
            path: 'campanhas',
            loadChildren: () => import('./routes/campanhas/campanhas.routes').then(r => r.CAMPANHAS_ROUTES),
            canActivate: [ AuthGuard ]
         },
      ],
      canActivate: [AuthGuard],
		canLoad: [AuthGuard]
   },

   { path: 'auth', title: 'Autenticação', component: LoginComponent, canActivate: [LoginGuard] },
   { path: 'nao-autorizado', component: UserNotAuthenticatedComponent },
   { path: '**', component: PageNotFoundComponent },
   { path: '', redirectTo: "/inicio", pathMatch: 'full' },
];
