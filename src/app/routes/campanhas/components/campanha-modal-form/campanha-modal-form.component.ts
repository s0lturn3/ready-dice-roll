import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CampanhaDto } from '../../../../shared/models/db/campanha.dto';
import { StorageService } from '../../../../shared/services/storage.service';
import { FormUtils } from '../../../../shared/utils/form-utils';
import { CampanhasService } from '../../services/campanhas.service';

@Component({
  selector: 'campanha-modal-form',
  imports: [
    ReactiveFormsModule,
    NgClass,

    ButtonModule,
    InputTextModule,
    TextareaModule,
    InputNumber,

    ToastModule
  ],
  templateUrl: './campanha-modal-form.component.html',
  styleUrl: './campanha-modal-form.component.css'
})
export class CampanhaModalFormComponent implements OnInit {

  // #region ==========> PROPERTIES <==========

  // #region PRIVATE
  private _campanhas: CampanhasService = inject(CampanhasService);
  // #endregion PRIVATE

  // #region PUBLIC
  @Input() campanha?: CampanhaDto | null;

  /** Emite um evento ao salvar. O valor enviado indica se o modal deve ser fechado. */
  @Output() onSave: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  public saving: boolean = false;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> FORM CONFIG <==========
  public form: FormGroup = new FormGroup({
    Nome: new FormControl<string | null>(null, [ Validators.required ]),
    Descricao: new FormControl<string | null>(null, [ Validators.required ]),
    Status: new FormControl<number | null>(null, [ Validators.required, Validators.max(100) ]),
    SistemaId: new FormControl<number | null>(null, [ Validators.max(100) ]),
  });

  public get FormUtils() { return FormUtils; }
  // #endregion ==========> FORM CONFIG <==========


  constructor(
    private _message: MessageService,
    private _storage: StorageService
  ) { }

  ngOnInit(): void {
    this.validateMode();
  }


  // #region ==========> API METHODS <==========

  // #region GET
  // [...]
  // #endregion GET

  // #region POST
  public saveCampanha(keepOpen: boolean = false): void {
    if (this.form.valid) {
      this.saving = true;

      const record: CampanhaDto = {
        Id: this.campanha?.Id ?? 0, // Se tiver ID, edição; senão criação
        Nome: this.form.controls["Nome"].value!,
        Descricao: this.form.controls["Descricao"].value!,
        Status: this.form.controls["Status"].value!,
        SistemaId: this.form.controls["SistemaId"].value!,
        CriadoPor: this.campanha?.CriadoPor ?? this._storage.loggedUserId!,
        DtCriacao: this.campanha?.DtCriacao ?? new Date().toUTCString(),
      };

      const request$ = this.campanha
        ? this._campanhas.updateCampanha(record) // supondo que tenha update
        : this._campanhas.createCampanha(record);

      request$.subscribe({
        next: () => {
          this.saving = false;

          if (keepOpen && !this.campanha) { // só faz sentido em "criar e continuar"
            this.form.reset();
            
            this.form.markAsPristine();
            this.form.markAsUntouched();

            this.onSave.emit(false);
          }
          else {
            this.onSave.emit(true);
          }
        },
        error: error => {
          this.saving = false;

          this._message.add({
            severity: 'error',
            summary: this.campanha ? 'Erro ao editar campanha' : 'Erro ao criar campanha',
            detail: error.error.message,
            key: 'tc',
            life: 3000,
          });
        }
      });
    }
    else {
      FormUtils.validateForm(this.form);

      this._message.add({
        severity: 'warn',
        summary: 'Erro nos campos',
        detail: 'Preencha os campos corretamente.',
        key: 'tc',
        life: 3000,
      });
    }
  }
  // #endregion POST

  // #region PUT
  // [...]
  // #endregion PUT

  // #region DELETE
  // [...]
  // #endregion DELETE

  // #endregion ==========> API METHODS <==========


  // #region ==========> UTILS <==========
  private validateMode(): void {
    if (this.campanha) {
      this.form.patchValue({
        Nome: this.campanha.Nome,
        Descricao: this.campanha.Descricao,
        Status: this.campanha.Status,
        SistemaId: this.campanha.SistemaId,
      });
    }

    console.log(this.campanha);
    console.log(this.form);
    
  }
  // #endregion ==========> UTILS <==========

}
