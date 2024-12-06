import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/header.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

interface User {
  id: string;
  username: string;
  email: string;
  senha: string;
  dtCriacao: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    HttpClientModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private apiUrl = 'http://localhost:3000/api/users';  // URL do seu servidor Node.js

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getUsers().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log("DEU RUIM");
      }
    );
  }



  // Método para buscar todos os usuários
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }
}
