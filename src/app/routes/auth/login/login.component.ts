import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { FooterComponent } from "../../../shared/components/footer/footer.component";
import { User } from '../../../shared/models/user.model';
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
    if(element) {
      element.nativeElement.focus()
    }
  }
  
  public step: AuthStep = AuthStep.Validation;

  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
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

    this._authService.validateEmail(emailValue).subscribe({
      next: response => {
        if (response.newUser !== undefined && response.newUser === true) {
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

  public validateLogin(): void {
    const emailValue = this.loginForm.controls["EMAIL_USERNAME"].value;
    const passwordValue = this.loginForm.controls["SENHA"].value;

    this._authService.validateLogin(emailValue, passwordValue).subscribe({
      next: response => {
        console.log(response);
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

    this._authService.createUser(user).subscribe({
      next: response => {
        localStorage.setItem('authToken', response["id"]);
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
