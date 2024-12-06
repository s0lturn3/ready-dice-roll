import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loginText',
  standalone: true
})
export class LoginTextPipe implements PipeTransform {

  transform(value: string, authMode: "signin" | "login"): unknown {
    switch(authMode) {
      case 'signin': return "Bem-vindo!";
      case 'login': return "Que bom ter você de volta!";
    }
  }

}
