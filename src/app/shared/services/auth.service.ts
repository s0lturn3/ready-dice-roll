import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';
import { ApiResponse } from '../models/api-response.model';
import { IUserLogin } from '../models/iuser-login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  private readonly USERS_URL: string = `${environment.apiUrl}/users`;
  // #endregion PRIVATE

  // #region PUBLIC
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> INITIALIZATION <==========
  constructor( private _httpClient: HttpClient ) {
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
      'headers': this.buildHeaders()
    }).pipe(
      catchError(this.handleTokenError),
      tap(response => {
        console.log(response);
        console.log(response.body);

        this.handleError(response);
      })
    );
  }

  public validateUsernameEmail(username_email: string): Observable<ApiResponse<{ newUser: boolean }>> {
    const params = new HttpParams().set('username_email', username_email);
    
    const url = `${this.USERS_URL}/validateUsernameEmail`

    return this._httpClient.get<ApiResponse<{ newUser: boolean }>>(url, {
      'headers': this.buildHeaders(),
      'params': params
    }).pipe(
      tap(response => {
        this.handleError(response);
      })
    );
  }

  public login(userForm: IUserLogin, rememberMe: boolean): Observable<ApiResponse<{ user: string, token: string }>> {
    const url = `${this.USERS_URL}/validateLogin`;

    return this._httpClient.post<ApiResponse<{ user: string, token: string }>>(url, JSON.stringify(userForm), {
      'headers': this.buildHeaders()
    }).pipe(
      tap(response => {
        this.handleError(response);
        this.setToken(response.body!.token, rememberMe);
      })
    );
  }
  // #endregion GET

  // #region POST
  public createUser(user: User, rememberMe: boolean): Observable<ApiResponse<{ user: string, token: string }>> {
    const url = `${this.USERS_URL}`;

    return this._httpClient.post<ApiResponse<{ user: string, token: string }>>(url, JSON.stringify(user), {
      'headers': this.buildHeaders()
    }).pipe(
      tap(response => {
        this.handleError(response);
        this.setToken(response.body!.token, rememberMe);
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
    this.destroyToken();
    this.loggedIn.next(false);
  }


  private buildHeaders(): HttpHeaders {
    const headersConfig: any = {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    };

    const token = this.getToken();
    if (token) headersConfig['Authorization'] = `Token ${token}`;

    return new HttpHeaders(headersConfig);
  }

  private getToken(): string { return window.localStorage['authToken'] || window.sessionStorage['authToken']; }
  private setToken(token: string, rememberMe: boolean = false) {
    if (rememberMe) localStorage['authToken'] = token;
    else sessionStorage['authToken'] = token;

    this.loggedIn.next(true);
  }
  private destroyToken(): void {
    window.localStorage.removeItem('authToken');
    window.sessionStorage.removeItem('authToken');

    location.reload();
  }


  private handleError(response: ApiResponse<any>) {
    if (response.error) {

      console.log(response);
      
      if (response.body['message'] === 'jwt expired') {
         this.destroyToken();
      }

      throw new Error(response.errorMessage);
    }
  }
  private handleTokenError(error: HttpErrorResponse) {
    if (error.error.body && error.error.body['message'] === 'jwt expired') {
      alert('Sessão expirada.');

      window.localStorage.removeItem('authToken');
      window.sessionStorage.removeItem('authToken');

      this.loggedIn.next(false);
      location.reload();
    }

    return throwError(() => new Error('Ocorreu um erro não identificado...'));
  }
  // #endregion ==========> UTILS <==========

}
