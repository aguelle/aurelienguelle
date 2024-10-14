import { Component } from '@angular/core';
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
}
