import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { Router } from '@angular/router';
import { LoginTextPipe } from '../../../shared/pipes/login-text.pipe';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';


export enum AuthStep {
  Validation = 0,
  Login = 1,
  SignIn = 2
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
  
  // #region PUBLIC
  public mode: "signin" | "login" = "login";
  public step: AuthStep = AuthStep.Validation;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  // #region ==========> FORM BUILDER <==========

  // #region FORM FIELDS
  public loginForm: FormGroup = new FormGroup({
    EMAIL_USERNAME: new FormControl<string>("", [Validators.required]),
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
    const emailValue = this.loginForm.controls["EMAIL_USERNAME"].value;

    this._authService.validateEmail(emailValue).subscribe({
      next: response => {
        this.step++;

        console.log("response: ", response);
        console.log("step: ", this.step);
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
