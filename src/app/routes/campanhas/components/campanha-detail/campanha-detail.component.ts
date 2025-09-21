import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'campanha-detail',
  imports: [
    RouterModule,
    ConfirmDialog, ToastModule, ButtonModule,
    FormsModule
  ],
  templateUrl: './campanha-detail.component.html',
  styleUrl: './campanha-detail.component.scss',
  providers: [ConfirmationService, MessageService]
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


  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) { }

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
  outroTeste() {
    this.messageService.add({
        severity: 'error',
        summary: 'OLOKO',
        detail: 'TÁ FUNCIONANDO MLK',
        life: 3000,
    });
    this.messageService.add({
        severity: 'success',
        summary: 'OLOKO',
        detail: 'TÁ FUNCIONANDO MLK',
        life: 3000,
    });
    this.messageService.add({
        severity: 'warn',
        summary: 'OLOKO',
        detail: 'TÁ FUNCIONANDO MLK',
        life: 3000,
    });
    this.messageService.add({
        severity: 'info',
        summary: 'OLOKO',
        detail: 'TÁ FUNCIONANDO MLK',
        life: 3000,
    });
  }

  confirm1(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to proceed?',
            header: 'Confirmation',
            closable: true,
            closeOnEscape: true,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Save',
            },
            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
            },
            reject: () => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Rejected',
                    detail: 'You have rejected',
                    life: 3000,
                });
            },
        });
    }

    confirm2(event: Event) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Do you want to delete this record?',
            header: 'Danger Zone',
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger',
            },

            accept: () => {
                this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            },
        });
    }
  // #endregion ==========> UTILS <==========

}
