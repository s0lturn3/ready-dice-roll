import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiResponse } from '../../../shared/models/api-response.model';
import { CampanhaDto } from '../../../shared/models/db/campanha.dto';

@Injectable({
  providedIn: 'root'
})
export class CampanhasService {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  private readonly BASE_URL: string = `${ environment.apiUrl }/campaigns`;

  private readonly HTTP_HEADERS: HttpHeaders = new HttpHeaders({
    'Content-type': 'application/json',
    'Accept': 'application/json'
  });
  // #endregion PRIVATE

  // #region PUBLIC
  // [...]
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  constructor(private _httpClient: HttpClient) { }


  // #region ==========> API METHODS <==========

  // #region GET
  public getCampanhas(): Observable<ApiResponse<CampanhaDto[]>> {
    const url = `${this.BASE_URL}/list`;

    return this._httpClient.get<ApiResponse<any>>(url, { 'headers': this.HTTP_HEADERS })
      .pipe( tap(response => {  }) );
  }
  // #endregion GET

  // #region POST
  public createCampanha(campanha: CampanhaDto): Observable<ApiResponse<any>> {
    const url = `${this.BASE_URL}`;

    return this._httpClient.post<ApiResponse<any>>(url, campanha, { 'headers': this.HTTP_HEADERS })
      .pipe( tap(response => {  }) );
  }
  // #endregion POST

  // #region PUT
  public updateCampanha(campanha: CampanhaDto): Observable<ApiResponse<any>> {
    const url = `${this.BASE_URL}/${campanha.Id}`;

    return this._httpClient.patch<ApiResponse<any>>(url, campanha, { 'headers': this.HTTP_HEADERS })
      .pipe( tap(response => {  }) );
  }
  // #endregion PUT

  // #region DELETE
  // [...]
  // #endregion DELETE

  // #endregion ==========> API METHODS <==========


  // #region ==========> UTILS <==========
  // [...]
  // #endregion ==========> UTILS <==========

}
