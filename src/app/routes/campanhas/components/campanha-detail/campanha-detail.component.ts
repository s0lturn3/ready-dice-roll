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
    { title: 'Mapas', descricao: '', route: '/campanhas/mapas/1' },
    { title: 'Habilidades', descricao: '', route: '/campanhas/habilidades/1' },
    { title: 'Personagens', descricao: '', route: '/campanhas/personagens/1' },
    { title: 'Jogadores', descricao: '', route: '/campanhas/jogadores/1' },
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
  // [...]
  // #endregion ==========> UTILS <==========

}
