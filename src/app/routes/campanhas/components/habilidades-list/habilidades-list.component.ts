import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SkillTreeComponent } from '../../../../shared/components/skill-tree/skill-tree.component';

@Component({
    selector: 'habilidades-list',
    imports: [
        SkillTreeComponent,
        RouterModule
    ],
    templateUrl: './habilidades-list.component.html',
    styleUrl: './habilidades-list.component.scss'
})
export class HabilidadesListComponent {

  // #region ==========> PROPERTIES <==========
  
  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  // [...]
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
  // [...]
  // #endregion ==========> UTILS <==========

}
