import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { SkillTreeComponent } from '../../shared/components/skill-tree/skill-tree.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgxGraphModule,
    SkillTreeComponent,
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
  public menuOpen: boolean = false;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> FORM CONFIG <==========
  // [...]
  // #endregion ==========> FORM CONFIG <==========


  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._authService.jwttest().subscribe({
      next: response => { console.log(response); },
      error: error => { console.log(error); }
    });
  }


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
  // [...]
  // #endregion ==========> UTILS <==========

}
