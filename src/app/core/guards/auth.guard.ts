// import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';

// export const authGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable()
export class AuthGuard {

  constructor(private router: Router, private messageService: MessageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const localToken = localStorage.getItem('authToken');
    const sessionToken = sessionStorage.getItem('authToken');

    if ((localToken && localToken !== undefined) || (sessionToken && sessionToken !== undefined)) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth']).then(() => {

      setTimeout(() => {
        this.messageService.add({
          severity: 'warn',
          summary: 'Atenção',
          detail: 'Você precisa estar logado para acessar essa página. Realize o login novamente.',
          key: 'tc',
          life: 3000,
        })
      }, 250);

      console.warn('Você precisa estar logado para acessar essa página. Realize o login novamente.');
    });
    
    return false;
  }
}