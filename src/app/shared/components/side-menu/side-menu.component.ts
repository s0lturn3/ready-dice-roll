import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'side-menu',
    imports: [
        RouterModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './side-menu.component.html',
    styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {

  // #region ==========> PROPERTIES <==========
  
  // #region PRIVATE
  // [...]
  // #endregion PRIVATE

  // #region PUBLIC
  public menuOpen: boolean = false;

  public loggedUser: string | null = null;
  // #endregion PUBLIC

  // #endregion ==========> PROPERTIES <==========


  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.jwttest().subscribe({
      next: response => {
        // console.log(response);
      },
      error: error => {
        // console.log(error);
      }
    });

    this.adjustSidebar();

    this.loggedUser = window.localStorage.getItem('loggedUserName') || window.sessionStorage.getItem('loggedUserName');
  }


  // #region ==========> API METHODS <==========

  // #region GET
  // [...]
  // #endregion GET

  // #region POST
  // [...]
  // #endregion POST

  // #region PUT
  // [...]
  // #endregion PUT

  // #region DELETE
  // [...]
  // #endregion DELETE

  // #endregion ==========> API METHODS <==========


  // #region ==========> UTILS <==========
  public logout(): void {
    this._authService.logout();
  }


  private adjustSidebar(): void {
    const sidebar = document.querySelector(".sidebar") as HTMLElement;
    const sidebarToggler = document.querySelector(".sidebar-toggler");
    const menuToggler = document.querySelector(".menu-toggler");

    // Ensure these heights match the CSS sidebar height values
    let collapsedSidebarHeight = "56px"; // Height in mobile view (collapsed)
    let fullSidebarHeight = "calc(100vh - 32px)"; // Height in larger screen

    // Toggle sidebar's collapsed state
    sidebarToggler!.addEventListener("click", () => {
      sidebar!.classList.toggle("collapsed");
    });

    // Update sidebar height and menu toggle text
    const toggleMenu = (isMenuActive: boolean) => {
      sidebar!.style.height = isMenuActive ? `${sidebar!.scrollHeight}px` : collapsedSidebarHeight;
      menuToggler!.querySelector("span")!.innerText = isMenuActive ? "close" : "menu";
    }

    // Toggle menu-active class and adjust height
    menuToggler!.addEventListener("click", () => {
      toggleMenu(sidebar!.classList.toggle("menu-active"));
    });

    // (Optional code): Adjust sidebar height on window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) {
        sidebar!.style.height = fullSidebarHeight;
      } else {
        sidebar!.classList.remove("collapsed");
        sidebar!.style.height = "auto";
        toggleMenu(sidebar!.classList.contains("menu-active"));
      }
    });
  }
  // #endregion ==========> UTILS <==========

}
