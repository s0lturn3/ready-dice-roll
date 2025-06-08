import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

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
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  public $campanhas: { title: string, route: string }[] = [
    { title: 'Pharloom', route: 'info/1' },
    { title: 'Sem nome', route: 'info/2' },
  ]
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  constructor() { }

  ngOnInit(): void { }


  // #region ==========> API METHODS <==========

  // #region GET
  // [...]
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
