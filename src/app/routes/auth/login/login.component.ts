import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight, faArrowRightToBracket, faPen } from '@fortawesome/free-solid-svg-icons';

import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { User } from '../../../shared/models/user.model';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { IUserLogin } from '../../../shared/models/iuser-login.model';


export enum AuthStep {
  Validation = 0,
  Login = 1,
  SignIn = 2,
  OAuth = 3,

  LoggedIn = 4,
  SignedIn = 5
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    FooterComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  // #region ==========> PROPERTIES <==========
  
  // #region PRIVATE
  // [...]
  // #endregion PRIVATE
  
  // #region PUBLIC
  @ViewChild('passwordLogin', { static: false }) 
  set passwordLoginInput(element: ElementRef<HTMLInputElement>) {
    if(element) element.nativeElement.focus()
  }
  
  public step: AuthStep = AuthStep.Validation;
  editEmail: boolean = false;

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faArrowRightToBracket = faArrowRightToBracket;
  faPen = faPen;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> FORM BUILDER <==========

  // #region FORM FIELDS
  public validationForm: FormGroup = new FormGroup({
    EMAIL_USERNAME: new FormControl<string>("", [Validators.required])
  });

  public get EMAIL_USERNAME_VALIDATION(): FormControl { return this.validationForm.get('EMAIL_USERNAME') as FormControl; }


  public loginForm: FormGroup = new FormGroup({
    EMAIL_USERNAME: new FormControl<string>({ value: "", disabled: this.editEmail }, [Validators.required]),
    SENHA: new FormControl<string>("", [Validators.required]),
    REMEMBER_ME: new FormControl<boolean>(false),
  });
  
  public get EMAIL_USERNAME_LOGIN(): FormControl { return this.loginForm.get('EMAIL_USERNAME') as FormControl; }
  public get SENHA_LOGIN(): FormControl { return this.loginForm.get('SENHA') as FormControl; }
  public get REMEMBER_ME_LOGIN(): boolean { return this.loginForm.get('REMEMBER_ME')?.value; }
  
  
  public signinForm: FormGroup = new FormGroup({
    EMAIL: new FormControl<string>("", [Validators.required]),
    USERNAME: new FormControl<string>("", [Validators.required]),
    SENHA: new FormControl<string>("", [Validators.required]),
    REMEMBER_ME: new FormControl<boolean>(false),
  });
  
  public get EMAIL_SIGNIN(): FormControl { return this.signinForm.get('EMAIL') as FormControl; }
  public get USERNAME_SIGNIN(): FormControl { return this.signinForm.get('USERNAME') as FormControl; }
  public get SENHA_SIGNIN(): FormControl { return this.signinForm.get('SENHA') as FormControl; }
  public get REMEMBER_ME_SIGNIN(): boolean { return this.loginForm.get('REMEMBER_ME')?.value; }
  // #endregion FORM FIELDS

  // #region FORM UTILS
  // [...]
  // #endregion FORM UTILS

  // #endregion ==========> FORM BUILDER <==========


  // #region ==========> INITIALIZATION <==========
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) { }

  ngOnInit(): void { }
  // #endregion ==========> INITIALIZATION <==========


  // #region ==========> SERVICE METHODS <==========

  // #region GET
  public validateEmail(): void {
    const emailValue = this.validationForm.controls["EMAIL_USERNAME"].value;

    this._authService.validateUsernameEmail(emailValue).subscribe({
      next: response => {
        if (response.body !== undefined && response.body.newUser === true) {
          this.step = 2;
        }
        else {
          this.loginForm.patchValue({
            EMAIL_USERNAME: this.validationForm.controls["EMAIL_USERNAME"].value
          });

          this.step = 1;
        }
      },
      error: error => {
        alert(error);
        throw new Error(error);
      }
    });
  }

  public login(): void {
    const userForm: IUserLogin = {
      usernameOrEmail: this.loginForm.controls["EMAIL_USERNAME"].value,
      password: this.loginForm.controls["SENHA"].value
    }

    this._authService.login(userForm, this.REMEMBER_ME_LOGIN).subscribe({
      next: () => {
        this._router.navigate(['/dashboard']);
      },
      error: error => {
        alert(error);
        throw new Error(error);
      }
    });
  }
  // #endregion GET

  // #region POST
  public createUser(): void {
    const user: User = {
      email: this.signinForm.controls["EMAIL"].value,
      username: this.signinForm.controls["USERNAME"].value,
      senha: this.signinForm.controls["SENHA"].value
    };

    this._authService.createUser(user, this.REMEMBER_ME_SIGNIN).subscribe({
      next: () => {
        this._router.navigate(['/dashboard']);
      },
      error: error => {
        alert(error);
        throw new Error(error);
      }
    });
  }
  // #endregion POST

  // #region DELETE
  // [...]
  // #endregion DELETE

  // #endregion ==========> SERVICE METHODS <==========


  // #region ==========> UTILS <==========
  returnHome(): void {
    this._router.navigate(['/inicio']);
  }
  // #endregion ==========> UTILS <==========

}
