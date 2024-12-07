import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, take, tap } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  private readonly USERS_URL: string = `${environment.apiUrl}/users`;
  private readonly HTTP_HEADERS: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  // #endregion PRIVATE

  // #region PUBLIC
  // [...]
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> INITIALIZATION <==========
  constructor( private _httpClient: HttpClient ) { }
  // #endregion ==========> INITIALIZATION <==========


  // #region ==========> SERVICE METHODS <==========

  // #region PREPARATION
  // [...]
  // #endregion PREPARATION

  // #region GET
  public validateEmail(username_email: string): Observable<any> {
    const params = new HttpParams().set('username_email', username_email);
    
    const url = `${this.USERS_URL}/validateUsernameEmail`

    return this._httpClient.get<any>(url, {
      'headers': this.HTTP_HEADERS,
      'params': params
    });
  }

  public validateLogin(username_email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username_email', username_email)
      .set('password', password);
    
    const url = `${this.USERS_URL}/validateLogin`;

    return this._httpClient.get<any>(url, {
      'headers': this.HTTP_HEADERS,
      'params': params
    }).pipe(
      tap(response => {
        if (!response) { throw Error(response); }
        else { localStorage.setItem('authToken', response?.Id) }
      })
    );
  }
  // #endregion GET

  // #region POST
  public createUser(user: User): Observable<any> {
    const url = `${this.USERS_URL}`;

    return this._httpClient.post<any>(url, JSON.stringify(user), {
      'headers': this.HTTP_HEADERS
    }).pipe(
      tap(response => {
        if (!response) { throw Error(response); }
        else { localStorage.setItem('authToken', response.id) }
      })
    );
  }
  // #endregion POST

  // #region DELETE
  // [...]
  // #endregion DELETE

  // #endregion ==========> SERVICE METHODS <==========


  // #region ==========> UTILS <==========
  // [...]
  // #endregion ==========> UTILS <==========

}
