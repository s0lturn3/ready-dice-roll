import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class LoginGuard {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('authToken')) {
      // Está logado, então vai para tela de dashboards
      this.router.navigate(['/dashboard']);
      return false;
    }
    
    // Não está logado, então permite entrar
    return true;
  }
}