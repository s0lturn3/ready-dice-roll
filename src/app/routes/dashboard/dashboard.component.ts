import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-dashboard',
    imports: [
        RouterModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  public cards: { title: string, content: string, route: string }[] = [
    { title: 'Campanhas', content: 'Navegar para as campanhas', route: '/manager/campaigns' },
    { title: 'Sistemas', content: 'Navegar para os sistemas', route: '/manager/systems' },
    { title: 'Personagens', content: 'Navegar para os personagens', route: '/manager/characters' },
  ]
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  constructor(private _authService: AuthService) { }

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
