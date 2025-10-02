import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CampanhaDto } from '../../../shared/models/db/campanha.dto';
import { PaginationDto } from '../../../shared/models/pagination.dto';

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


  constructor( private _http: HttpClient ) { }


  // #region ==========> API METHODS <==========

  // #region GET
  public getCampanhas(params?: PaginationDto): Observable<any> {
    return this._http.get<any>(`${this.BASE_URL}`, { params: { ...params } });
  }

  public getCampanha(id: number): Observable<CampanhaDto> {
    return this._http.get<CampanhaDto>(`${this.BASE_URL}/${id}`);
  }
  // #endregion GET

  // #region POST
  public createCampanha(campanha: Partial<CampanhaDto>): Observable<CampanhaDto> {
    return this._http.post<CampanhaDto>(this.BASE_URL, campanha);
  }
  // #endregion POST

  // #region PATCH
  public updateCampanha(id: number, campanha: Partial<CampanhaDto>): Observable<CampanhaDto> {
    return this._http.patch<CampanhaDto>(`${this.BASE_URL}/${id}`, campanha);
  }
  // #endregion PATCH

  // #region PUT
  // [...]
  // #endregion PUT

  // #region DELETE
  public deleteCampanha(id: number): Observable<any> {
    return this._http.delete<any>(`${this.BASE_URL}/${id}`);
  }
  // #endregion DELETE

  // #endregion ==========> API METHODS <==========


  // #region ==========> UTILS <==========
  // [...]
  // #endregion ==========> UTILS <==========

}
