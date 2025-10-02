import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { CampanhaDto } from '../../../../shared/models/db/campanha.dto';
import { CampanhasService } from '../../services/campanhas.service';
import { CampanhaModalFormComponent } from '../campanha-modal-form/campanha-modal-form.component';

@Component({
  selector: 'campanhas-list',
  imports: [
    RouterModule,
    ReactiveFormsModule,

    Dialog,
    ButtonModule,
    CardModule,
    ToastModule,
    
    CampanhaModalFormComponent
  ],
  templateUrl: './campanhas-list.component.html',
  styleUrl: './campanhas-list.component.css'
})
export class CampanhasListComponent implements OnInit {

  // #region ==========> PROPERTIES <==========
  
  // #region PRIVATE
  private _campanhas: CampanhasService = inject(CampanhasService);
  // #endregion PRIVATE

  // #region PUBLIC
  public visible: boolean = false;

  public $campanhas?: CampanhaDto[];
  public selectedCampanha?: CampanhaDto | null;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  constructor(private _message: MessageService) { }

  ngOnInit(): void {
    this.getCampanhas();
  }


  // #region ==========> API METHODS <==========

  // #region GET
  public getCampanhas(): void {
    this._campanhas.getCampanhas().subscribe({
      next: response => {
        this.$campanhas = response.body
      },
      error: error => {
        this._message.add({
          severity: 'error',
          summary: 'Erro ao buscar as campanhas',
          detail: error.error.message,
          key: 'tc',
          life: 3000,
        });
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
  public showDialog(campanha: CampanhaDto | null = null): void {
    this.selectedCampanha = campanha;
    this.visible = true;
  }
  // #endregion ==========> UTILS <==========

}
