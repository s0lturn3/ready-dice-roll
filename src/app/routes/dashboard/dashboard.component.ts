import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { SkillTreeComponent } from '../../shared/components/skill-tree/skill-tree.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NgxGraphModule,
    SkillTreeComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._authService.jwttest().subscribe({
      next: response => { console.log(response); },
      error: error => { console.log(error); }
    });
  }

}
