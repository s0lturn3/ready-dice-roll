import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { Drawer, DrawerModule } from 'primeng/drawer';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-dashboard',
    imports: [
      RouterModule,
      ButtonModule,
      ToastModule,
      ConfirmPopupModule,
      DrawerModule,
      AvatarModule,
      CardModule
    ],
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
    ];

    @ViewChild('drawerRef') drawerRef!: Drawer;

    closeCallback(e: any): void {
        this.drawerRef.close(e);
    }

    visible: boolean = false;
    // #endregion PUBLIC

    // #endregion ==========> PROPERTIES <==========


    constructor(
        private _authService: AuthService,
        private confirmationService: ConfirmationService, private messageService: MessageService
    ) { }

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
    confirm1(event: Event) {
            this.confirmationService.confirm({
                target: event.currentTarget as EventTarget,
                message: 'Are you sure you want to proceed?',
                icon: 'pi pi-exclamation-triangle',
                rejectButtonProps: {
                    label: 'Cancel',
                    severity: 'secondary',
                    outlined: true
                },
                acceptButtonProps: {
                    label: 'Save'
                },
                accept: () => {
                    this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
                },
                reject: () => {
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                }
            });
        }

        confirm2(event: Event) {
            this.confirmationService.confirm({
                target: event.currentTarget as EventTarget,
                message: 'Do you want to delete this record?',
                icon: 'pi pi-info-circle',
                rejectButtonProps: {
                    label: 'Cancel',
                    severity: 'secondary',
                    outlined: true
                },
                acceptButtonProps: {
                    label: 'Delete',
                    severity: 'danger'
                },
                accept: () => {
                    this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
                },
                reject: () => {
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                }
            });
        }
    // #endregion ==========> UTILS <==========

}
