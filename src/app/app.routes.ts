import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { HomeComponent } from './routes/home/home.component';
import { LoginComponent } from './routes/auth/login/login.component';
import { UserNotAuthenticatedComponent } from './shared/components/user-not-authenticated/user-not-authenticated.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { LoginGuard } from './core/guards/login.guard';


export const routes: Routes = [
   { path: 'inicio', title: 'Início', component: HomeComponent },
   
   { path: 'auth', title: 'Autenticação', component: LoginComponent, canActivate: [LoginGuard] },

   { path: 'dashboard', title: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
   

   { path: '',   redirectTo: '/auth', pathMatch: 'full' },
   { path: 'nao-autorizado', component: UserNotAuthenticatedComponent },
   { path: '**', component: PageNotFoundComponent },
];
