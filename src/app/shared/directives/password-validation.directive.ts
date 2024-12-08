import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[passwordValidation]',
  standalone: true
})
export class PasswordValidationDirective implements OnInit {

  /**
   * @param _elementRef - Referência ao elemento DOM ao qual a diretiva está associada.
   * @param _renderer - Serviço Angular para manipulação segura do DOM.
   */
  constructor(
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
  ) { }


  ngOnInit(): void {
    this.addValidations();
  }


  /** Adiciona o marcador de asterisco ao elemento <label>. */
  private addValidations(): void {
    const divElement = document.createElement("div");
    divElement.className = "psw-validations";

    const ulValidators = document.createElement('ul');
    ulValidators.id = "ul-validations";

    this._renderer.appendChild(ulValidators, this.addValidationLine('8MinChar'));
    this._renderer.appendChild(ulValidators, this.addValidationLine('UpperLetters'));
    this._renderer.appendChild(ulValidators, this.addValidationLine('LowerLetters'));
    this._renderer.appendChild(ulValidators, this.addValidationLine('Numbers'));
    this._renderer.appendChild(ulValidators, this.addValidationLine('SpecialChars'));
    
    this._renderer.appendChild(divElement, ulValidators);
    this._renderer.appendChild(this._elementRef.nativeElement, divElement);
  }


  /** Minha ideia com este método é que a cada linha ele adicione o validator correspondente */
  private addValidationLine(validatorLine: string): any {
    switch(validatorLine) {
      case "8MinChar":
        break;

      case "UpperLetters":
        break;

      case "LowerLetters":
        break;

      case "Numbers":
        break;

      case "SpecialChars":
        break;
    }
  }

}
