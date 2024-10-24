import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { MenuComponent } from "./menu/menu.component";
import { FooterComponent } from "./footer/footer.component";

import { CommonModule, NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MenuComponent,
    FooterComponent,
    NgClass,
    FontAwesomeModule,
    RouterLink,
    RouterLinkActive,
    RouterModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aguelle';
  isMusicPage: boolean = false;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Vérifiez si l'URL contient "musique"
        this.isMusicPage = event.urlAfterRedirects.includes('/musique');
      }
    });
  }
  // constructor(public navigateService: NavigateService) {}
}
