import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { Router } from '@angular/router';
import { LoginTextPipe } from '../../../shared/pipes/login-text.pipe';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';


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
    // LoginTextPipe,
    ReactiveFormsModule,
    FooterComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  // #region ==========> PROPERTIES <==========
  
  // #region PRIVATE
  private _currentStep: AuthStep = AuthStep.Validation;
  // #endregion PRIVATE

  // #region PUBLIC
  @ViewChild('passwordLogin', { static: false }) 
   set passwordLoginInput(element: ElementRef<HTMLInputElement>) {
     if(element) {
       element.nativeElement.focus()
     }
  }

  public mode: "signin" | "login" = "login";

  public get step(): AuthStep { return this._currentStep; }
  public set step(value: AuthStep) {
    this._currentStep = value;
    console.log(value);

    switch(value) {
      case AuthStep.Validation:
        break;

      case AuthStep.Login:
        this.loginForm.patchValue({
          EMAIL_USERNAME: this.validationForm.controls["EMAIL_USERNAME"].value
        });

        console.log(this.passwordLoginInput);
        break;

      case AuthStep.SignIn:
        break;

      case AuthStep.OAuth:
        break;
    }
  }
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> FORM BUILDER <==========

  // #region FORM FIELDS
  public validationForm: FormGroup = new FormGroup({
    EMAIL_USERNAME: new FormControl<string>("", [Validators.required])
  });

  public loginForm: FormGroup = new FormGroup({
    EMAIL_USERNAME: new FormControl<string>({ value: "", disabled: true }, [Validators.required]),
    SENHA: new FormControl<string>("", [Validators.required]),
  });

  public signinForm: FormGroup = new FormGroup({
    EMAIL: new FormControl<string>("", [Validators.required]),
    USERNAME: new FormControl<string>("", [Validators.required]),
    SENHA: new FormControl<string>("", [Validators.required])
  });
  // #endregion FORM FIELDS

  // #region FORM BUILDER
  // [...]
  // #endregion FORM BUILDER

  // #endregion ==========> FORM BUILDER <==========


  // #region ==========> INITIALIZATION <==========
  constructor(
    private _authService: AuthService,
    private _router: Router,
  ) {
    this.getParms();
  }

  ngOnInit(): void { }
  // #endregion ==========> INITIALIZATION <==========


  // #region ==========> SERVICE METHODS <==========

  // #region PREPARATION
  // [...]
  // #endregion PREPARATION

  // #region GET
  // [...]
  // #endregion GET

  // #region POST
  // [...]
  // #endregion POST

  // #region DELETE
  // [...]
  // #endregion DELETE

  // #endregion ==========> SERVICE METHODS <==========


  // #region ==========> UTILS <==========
  public validateEmail(): void {
    const emailValue = this.validationForm.controls["EMAIL_USERNAME"].value;

    this._authService.validateEmail(emailValue).subscribe({
      next: response => {
        this.step = 1;
      },
      error: error => {
        throw new Error(error);
      }
    });
  }

  public validateLogin(): void {
    const emailValue = this.loginForm.controls["EMAIL_USERNAME"].value;
    const passwordValue = this.loginForm.controls["SENHA"].value;

    this._authService.validateLogin(emailValue, passwordValue).subscribe({
      next: response => {
        this.step++;
      },
      error: error => {
        throw new Error(error);
      }
    });
  }


  private getParms(): void {
    if    (this._router.url.includes('signin')) this.mode = "signin";
    else  this.mode = "login";
  }
  // #endregion ==========> UTILS <==========

}
