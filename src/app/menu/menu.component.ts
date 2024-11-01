import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavigateService } from '../navigate.service';
import { ThemeService } from '../theme.service';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
     NgClass,
       RouterLink,
    RouterLinkActive,
  RouterModule,
FontAwesomeModule    ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(
    public navigateService: NavigateService,
    private themeService: ThemeService,
    library: FaIconLibrary) { 
      library.addIcons(faMoon, faSun);
      ;
    }
    
    isMenuOpen = false;

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }



  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

}
