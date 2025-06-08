import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class LoginGuard {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const localToken = localStorage.getItem('authToken');
    const sessionToken = sessionStorage.getItem('authToken');

    if ((localToken && localToken !== undefined) || (sessionToken && sessionToken !== undefined)) {
      // Está logado, então vai para tela de dashboards
      this.router.navigate(['/dashboard']);
      return false;
    }
    
    // Não está logado, então permite entrar
    return true;
  }
}