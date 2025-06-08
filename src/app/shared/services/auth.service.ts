import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';

import { Router } from '@angular/router';
import { ApiResponse } from '../models/api-response.model';
import { Usuario } from '../models/db/usuario.model';
import { IUserLogin } from '../models/iuser-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  private readonly USERS_URL: string = `${ environment.apiUrl }/auth`;
  // #endregion PRIVATE

  // #region PUBLIC
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> INITIALIZATION <==========
  constructor(
    private _httpClient: HttpClient,
    private _router: Router,
  ) {
    const token = this.getToken();
    this.loggedIn = new BehaviorSubject<boolean>(token ? true : false);
  }
  // #endregion ==========> INITIALIZATION <==========


  // #region ==========> SERVICE METHODS <==========

  // #region GET
  public jwttest(): Observable<ApiResponse<{
    name: string,
    message: string,
    expiredAt: string
}>> {
    const url = `${this.USERS_URL}/jwttest`;

    return this._httpClient.get<ApiResponse<{
      name: string,
      message: string,
      expiredAt: string
  }>>(url, {
      'headers': this.buildHeaders(true)
    }).pipe(
      catchError(this.handleTokenError),
      tap(response => {
        // console.log(response);
        this.handleError(response);
      })
    );
  }

  public login(userForm: IUserLogin, rememberMe: boolean): Observable<ApiResponse<{ access_token: string, userId: string, userName: string }>> {
    const url = `${this.USERS_URL}/login`;

    return this._httpClient.post<ApiResponse<{ access_token: string, userId: string, userName: string }>>(url, JSON.stringify(userForm), {
      'headers': this.buildHeaders(false)
    }).pipe(
      tap(response => {
        this.handleError(response);
        this.setToken(response.body!.access_token, response.body!.userId, response.body!.userName, rememberMe);
      })
    );
  }
  // #endregion GET

  // #region POST
  public createUser(user: Usuario, rememberMe: boolean): Observable<ApiResponse<{ access_token: string, userId: string, userName: string }>> {
    const url = `${this.USERS_URL}/signIn`;

    return this._httpClient.post<ApiResponse<{ access_token: string, userId: string, userName: string }>>(url, JSON.stringify(user), {
      'headers': this.buildHeaders(false)
    }).pipe(
      tap(response => {
        this.handleError(response);
        this.setToken(response.body!.access_token, response.body!.userId, response.body!.userName, rememberMe);


      })
    );
  }
  // #endregion POST

  // #region DELETE
  // [...]
  // #endregion DELETE

  // #endregion ==========> SERVICE METHODS <==========


  // #region ==========> UTILS <==========
  public logout(): void {
    this.loggedIn.next(false);
    this.destroyToken();
  }


  private buildHeaders(appendToken: boolean): HttpHeaders {
    const headersConfig: any = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    };

    if (appendToken) {
      const token = this.getToken();
      if (token) headersConfig['Authorization'] = `Token ${token}`;
    }

    return new HttpHeaders(headersConfig);
  }

  private getToken(): string { return window.localStorage['authToken'] || window.sessionStorage['authToken']; }
  private setToken(token: string, loggedUserId: string, loggedUserName: string, rememberMe: boolean = false) {
    if (rememberMe) {
      localStorage['authToken'] = token;
      localStorage['loggedUserId'] = loggedUserId;
      localStorage['loggedUserName'] = loggedUserName;
    }
    else {
      sessionStorage['authToken'] = token;
      sessionStorage['loggedUserId'] = loggedUserId;
      sessionStorage['loggedUserName'] = loggedUserName;
    }

    this.loggedIn.next(true);
  }


  private destroyToken(): void {
    window.localStorage.removeItem('authToken');
    window.sessionStorage.removeItem('authToken');
    
    window.localStorage.removeItem('loggedUserId');
    window.sessionStorage.removeItem('loggedUserId');

    window.localStorage.removeItem('loggedUserName');
    window.sessionStorage.removeItem('loggedUserName');

    location.reload();
  }


  private handleError(response: ApiResponse<any>) {
    if (response.error) {      
      if (response.body['message'] === 'jwt expired') {
        this.destroyToken();
      }

      throw new Error(response.errorMessage);
    }
  }
  private handleTokenError(error: HttpErrorResponse) {
    if (error.error['message'] && error.error['message'] === 'Sessão expirada. Faça login novamente.') {
      window.localStorage.removeItem('authToken');
      window.sessionStorage.removeItem('authToken');
      
      window.localStorage.removeItem('loggedUserId');
      window.sessionStorage.removeItem('loggedUserId');

      window.localStorage.removeItem('loggedUserName');
      window.sessionStorage.removeItem('loggedUserName');

      location.reload();
    }

    return throwError(() => new Error('Ocorreu um erro não identificado...'));
  }
  // #endregion ==========> UTILS <==========

}
