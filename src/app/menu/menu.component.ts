import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { HomeComponent } from "../home/home.component";
import { DiplomesComponent } from "../diplomes/diplomes.component";
import { RealisationsComponent } from "../realisations/realisations.component";
import { ExperiencesComponent } from "../experiences/experiences.component";
import { ContactComponent } from "../contact/contact.component";
import { NavigateService } from '../navigate.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgIf, NgClass, HomeComponent, DiplomesComponent, RealisationsComponent, ExperiencesComponent, ContactComponent],
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
