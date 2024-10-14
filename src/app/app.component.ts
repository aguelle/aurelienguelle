import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from "./menu/menu.component";
import { FooterComponent } from "./footer/footer.component";
import { DiplomesComponent } from "./diplomes/diplomes.component";
import { ExperiencesComponent } from "./experiences/experiences.component";
import { RealisationsComponent } from "./realisations/realisations.component";
import { ContactComponent } from "./contact/contact.component";
import { HomeComponent } from "./home/home.component";
import { NgClass } from '@angular/common';
import { NavigateService } from './navigate.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MenuComponent, 
    FooterComponent, 
    DiplomesComponent, 
    ExperiencesComponent, 
    RealisationsComponent, 
    ContactComponent, 
    HomeComponent,
    NgClass,
    FontAwesomeModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(public navigateService: NavigateService) {}

  title = 'aguelle';
  backgroundColor = 'bg-gray-50';

  ngOnInit() {
    this.updateBackgroundColor(window.scrollX);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollPosition = window.scrollX;
    this.updateBackgroundColor(scrollPosition);
  }

  updateBackgroundColor(scrollPosition: number) {
    // Changez les couleurs en fonction de la position de défilement
    if (scrollPosition < 20) {
      this.backgroundColor = 'bg-white'; // Couleur claire
    } else if (scrollPosition < 40) {
      this.backgroundColor = 'bg-red-300'; // Couleur intermédiaire
    } else {
      this.backgroundColor = 'bg-blue-800'; // Couleur sombre
    }
  }


}
