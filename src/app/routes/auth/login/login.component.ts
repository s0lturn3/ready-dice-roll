import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitch } from 'primeng/toggleswitch';

import { Usuario } from '../../../shared/models/db/usuario.model';
import { IUserLogin } from '../../../shared/models/iuser-login.model';
import { AuthService } from '../../../shared/services/auth.service';
import { FormUtils } from '../../../shared/utils/form-utils';


export enum AuthStep {
  // Validation = 0,
  Login = 1,
  SignIn = 2,
  OAuth = 3,

  LoggedIn = 4,
  SignedIn = 5
}

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToastModule,

    ButtonModule,
    InputTextModule,
    PasswordModule,
    ToggleSwitch
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  // #region ==========> PROPERTIES <==========
  
  // #region PRIVATE
  private _formStep: AuthStep = AuthStep.Login;
  // #endregion PRIVATE
  
  // #region PUBLIC
  public get step(): AuthStep { return this._formStep; }
  public set step(value: AuthStep) {
    this._formStep = value;
    
    this.signinForm.reset();
    this.loginForm.reset();
  }

  public loading: boolean = false;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> FORM BUILDER <==========
  public loginForm: FormGroup = new FormGroup({
    EMAIL: new FormControl<string>("", [Validators.required]),
    SENHA: new FormControl<string>("", [Validators.required]),
    REMEMBER_ME: new FormControl<boolean>(false),
  });
  
  public get EMAIL_LOGIN(): FormControl { return this.loginForm.get('EMAIL') as FormControl; }
  public get SENHA_LOGIN(): FormControl { return this.loginForm.get('SENHA') as FormControl; }
  public get REMEMBER_ME_LOGIN(): boolean { return this.loginForm.get('REMEMBER_ME')?.value; }
  
  
  public signinForm: FormGroup = new FormGroup({
    EMAIL: new FormControl<string>("", [Validators.required]),
    USERNAME: new FormControl<string>("", [Validators.required]),
    SENHA: new FormControl<string>("", [Validators.required]),
    CONFIRM_SENHA: new FormControl<string>("", [Validators.required]),
    REMEMBER_ME: new FormControl<boolean>(false),
  });
  
  public get EMAIL_SIGNIN(): FormControl { return this.signinForm.get('EMAIL') as FormControl; }
  public get USERNAME_SIGNIN(): FormControl { return this.signinForm.get('USERNAME') as FormControl; }
  public get SENHA_SIGNIN(): FormControl { return this.signinForm.get('SENHA') as FormControl; }
  public get CONFIRM_SENHA_SIGNIN(): FormControl { return this.signinForm.get('CONFIRM_SENHA') as FormControl; }
  public get REMEMBER_ME_SIGNIN(): boolean { return this.loginForm.get('REMEMBER_ME')?.value; }
  // #endregion ==========> FORM BUILDER <==========


  // #region ==========> INITIALIZATION <==========
  constructor(
    private _authService: AuthService,
    private _router: Router,

    // PrimeNG
    private messageService: MessageService
  ) { }

  ngOnInit(): void { }
  // #endregion ==========> INITIALIZATION <==========


  // #region ==========> SERVICE METHODS <==========

  // #region GET
  public login(): void {
    if (this.loginForm.valid) {
      this.loading = true;

      const userForm: IUserLogin = {
        usernameOrEmail: this.loginForm.controls["EMAIL"].value,
        password: this.loginForm.controls["SENHA"].value
      }
  
      this._authService.login(userForm, this.REMEMBER_ME_LOGIN).subscribe({
        next: () => {
          this.loading = false;
          this._router.navigate(['/manager/dashboard']);
        },
        error: error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro no login',
            detail: error.error.errorMessage,
            key: 'tc',
            life: 3000,
          });

          this.loading = false;
          throw new Error(error.error.errorMessage);
        }
      });
    }
    else {
      FormUtils.validateForm(this.loginForm);

      this.messageService.add({
        severity: 'warn',
        summary: 'Erro nos campos',
        detail: 'Preencha os campos corretamente.',
        key: 'tc',
        life: 3000,
      });
    }
  }
  // #endregion GET

  // #region POST
  public createUser(): void {
    this.validateSenhas();
    
    if (this.signinForm.valid) {
      this.loading = true;

      const user: Usuario = {
        Email: this.signinForm.controls["EMAIL"].value,
        Username: this.signinForm.controls["USERNAME"].value,
        Senha: this.signinForm.controls["SENHA"].value
      };
  
      this._authService.createUser(user, this.REMEMBER_ME_SIGNIN).subscribe({
        next: () => {
          this.loading = false;
          this._router.navigate(['/manager/dashboard']);
        },
        error: error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro ao cadastrar usuário',
            detail: error.error.errorMessage,
            key: 'tc',
            life: 3000,
          });
          
          this.loading = false;
          throw new Error(error.error.errorMessage);
        }
      });
    }
    else {
      FormUtils.validateForm(this.signinForm);

      this.messageService.add({
        severity: 'warn',
        summary: 'Erro nos campos',
        detail: 'Preencha os campos corretamente.',
        key: 'tc',
        life: 3000,
      });
    }
  }
  // #endregion POST

  // #endregion ==========> SERVICE METHODS <==========


  // #region ==========> UTILS <==========
  private validateSenhas(): void {
    if (this.signinForm.controls["SENHA"].value !== this.signinForm.controls["CONFIRM_SENHA"].value) {
      this.signinForm.controls["CONFIRM_SENHA"].setErrors({ 'invalid': true });
      
      this.messageService.add({
        severity: 'error',
        summary: 'Senhas inconsistentes',
        detail: 'As senhas não coincidem.',
        key: 'tc',
        life: 3000,
      });
    }
  }
  // #endregion ==========> UTILS <==========

}
