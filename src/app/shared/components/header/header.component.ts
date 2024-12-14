import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  userLoggedIn!: boolean;

  constructor(
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._auth.loggedIn.subscribe(value => {
      this.userLoggedIn = value;
    });
  }

  logout() {
    this._auth.logout();
  }

}
