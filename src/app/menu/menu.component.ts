import { CommonModule, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import { NavigateService } from '../navigate.service';
import { ThemeService } from '../theme.service';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
     NgClass,
       RouterLink,
    RouterLinkActive,
  RouterModule    ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  constructor(
    public navigateService: NavigateService,
    private themeService: ThemeService) { }
    
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
