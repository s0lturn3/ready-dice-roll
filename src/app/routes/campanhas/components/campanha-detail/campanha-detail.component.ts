import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'campanha-detail',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './campanha-detail.component.html',
  styleUrl: './campanha-detail.component.scss'
})
export class CampanhaDetailComponent {

  // #region ==========> PROPERTIES <==========
  
  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  public $cards: { title: string, descricao: string, route: string }[] = [
    { title: 'Criaturas', descricao: '', route: '/manager/campaigns/creatures/1' },
    { title: 'Famílias', descricao: '', route: '/manager/campaigns/families/1' },
    { title: 'Habilidades', descricao: '', route: '/manager/campaigns/skills/1' },
    { title: 'Jogadores', descricao: '', route: '/manager/campaigns/players/1' },
    { title: 'Localidades', descricao: '', route: '/manager/campaigns/locations/1' },
    { title: 'Mapas', descricao: '', route: '/manager/campaigns/maps/1' },
    { title: 'Notas', descricao: '', route: '/manager/campaigns/notes/1' },
    { title: 'Objetos', descricao: '', route: '/manager/campaigns/objects/1' },
    { title: 'Organizações', descricao: '', route: '/manager/campaigns/organizations/1' },
    { title: 'Personagens', descricao: '', route: '/manager/campaigns/characters/1' },
    { title: 'Quests', descricao: '', route: '/manager/campaigns/quests/1' },
    { title: 'Raças', descricao: '', route: '/manager/campaigns/races/1' },
    { title: 'Timeline', descricao: '', route: '/manager/campaigns/timeline/1' },
  ];
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
