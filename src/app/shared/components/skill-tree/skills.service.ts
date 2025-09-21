import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../models/api-response.model';


interface Skill {
  id: string;
  label: string;
  originalId: number;
  nome: string;
  descricaoCurta: string;
  descricaoCompleta: string;
  tipo: 'Passiva' | 'Habilidade' | 'Melhoria' | 'Evolução';
  level: number;
  isRoot: true;
  unlockStatus: string;
  campanhaId: number;
  exclusivaClasseId: number;
  skillCategory: string;
}


@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  private readonly BASE_URL: string = `${ environment.apiUrl }/skills`;
  // #endregion PRIVATE

  // #region PUBLIC
  // [...]
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  constructor( private _httpClient: HttpClient ) { }


  // #region ==========> API METHODS <==========

  // #region GET
  public getSkills(): Observable<ApiResponse<{ habilidades: Skill[] }>> {
    const url = `${this.BASE_URL}/skills`;

    return this._httpClient.get<ApiResponse<{ habilidades: Skill[] }>>(url, { 'headers': this.buildHeaders(true) })
    .pipe(
      catchError(this.handleTokenError),
      tap(response => { this.handleError(response) })
    );
  }
  // #endregion GET

  // #region POST
  // [...]
  // #endregion POST

  // #region PUT
  // [...]
  // #endregion PUT

  // #region DELETE
  // [...]
  // #endregion DELETE

  // #endregion ==========> API METHODS <==========


  // #region ==========> UTILS <==========
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
