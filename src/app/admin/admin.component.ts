import { Component } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExperienceFormComponent } from "./experience-form/experience-form.component";
import { RealisationFormComponent } from "./realisation-form/realisation-form.component";
import { MusicFormComponent } from "./music-form/music-form.component";
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { NavComponent } from "./nav/nav.component";


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ExperienceFormComponent,
    RealisationFormComponent,
    MusicFormComponent,
    NavComponent,
    RouterLink, 
    RouterLinkActive, 
    RouterModule
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {

  constructor(
    private auth: Auth, 
    private router: Router,
  ) {}

  logout() {
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Erreur lors de la déconnexion', error);
      });
  }
}
