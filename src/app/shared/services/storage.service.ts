import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC

  public get loggedUserId(): string | null { return localStorage.getItem('loggedUserId') || sessionStorage.getItem('loggedUserId'); }

  public get loggedUserName(): string | null { return localStorage.getItem('loggedUserName') || sessionStorage.getItem('loggedUserName'); }

  public get authToken(): string | null { return localStorage.getItem('authToken') || sessionStorage.getItem('authToken'); }

  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> INITIALIZATION <==========
  constructor(private _httpClient: HttpClient) {  }
  // #endregion ==========> INITIALIZATION <==========


  // #region ==========> UTILS <==========
  
  // #endregion ==========> UTILS <==========

}
