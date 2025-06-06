// import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

// export const authGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const localToken = localStorage.getItem('authToken');
    const sessionToken = sessionStorage.getItem('authToken');

    return true; // Temporariamente permitir acessar todas rotas, até o problema do login se resolver

    if ((localToken && localToken !== undefined) || (sessionToken && sessionToken !== undefined)) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth']).then(() => {
      alert('Você precisa estar logado para acessar essa página. Realize o login novamente.');
    });
    return false;
  }
}