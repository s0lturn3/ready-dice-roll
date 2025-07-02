import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CampanhaDto } from '../../../../shared/models/db/campanha.dto';
import { CampanhasService } from '../../services/campanhas.service';

@Component({
  selector: 'campanhas-list',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './campanhas-list.component.html',
  styleUrl: './campanhas-list.component.scss'
})
export class CampanhasListComponent {

  // #region ==========> PROPERTIES <==========
  
  // #region PRIVATE
  private _campanhas: CampanhasService = inject(CampanhasService);
  // #endregion PRIVATE

  // #region PUBLIC
  public $campanhas?: CampanhaDto[];
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  constructor() { }

  ngOnInit(): void {
    this.getCampanhas();
  }


  // #region ==========> API METHODS <==========

  // #region GET
  public getCampanhas(): void {
    this._campanhas.getCampanhas().subscribe({
      next: response => {
        this.$campanhas = response.body
      }
    })
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
  
  // #endregion ==========> UTILS <==========

}
