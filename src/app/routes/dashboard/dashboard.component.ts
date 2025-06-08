import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgxGraphModule,
    // SkillTreeComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  
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
