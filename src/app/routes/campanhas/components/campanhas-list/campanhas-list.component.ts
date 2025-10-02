import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';

import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
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
    ConfirmPopupModule,
    
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


  constructor(
    private _confirmation: ConfirmationService,
    private _message: MessageService
  ) { }

  ngOnInit(): void {
    this.getCampanhas();
  }


  // #region ==========> API METHODS <==========

  // #region GET
  public getCampanhas(): void {
    this._campanhas.getCampanhas({ page: 1, limit: 10 }).subscribe({
      next: response => {
        this.$campanhas = response.body.records;
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

  // #region DELETE
  public deleteCampanha(id: number): void {
    this._campanhas.deleteCampanha(id).subscribe({
      next: response => {
        console.log(response);

        this._message.add({ severity: 'info', summary: 'Excluída', detail: 'Campanha excluída com sucesso', life: 3000 });
        this.getCampanhas();
      },
      error: error => {
        this._message.add({
          severity: 'error',
          summary: 'Erro ao excluir a campanha',
          detail: error.error.message,
          key: 'tc',
          life: 3000,
        });
      }
    })
  }
  // #endregion DELETE

  // #endregion ==========> API METHODS <==========


  // #region ==========> UTILS <==========
  public showDialog(campanha: CampanhaDto | null = null): void {
    this.selectedCampanha = campanha;
    this.visible = true;
  }

  confirmDelete(event: Event, id: number) {
    this._confirmation.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Quer mesmo excluir esta campanha?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Excluir',
        severity: 'danger'
      },
      accept: () => {
        this.deleteCampanha(id);
      },
      reject: () => {
        this._message.add({ severity: 'error', summary: 'Cancelado', detail: 'Exclusão cancelada', life: 3000 });
      }
    });
  }
  // #endregion ==========> UTILS <==========

}
