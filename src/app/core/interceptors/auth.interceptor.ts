import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = window.localStorage['authToken'] || window.sessionStorage['authToken'];

  if (token) {
    const reqWithHeader = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });

    return next(reqWithHeader);
  }

  return next(req);
};
