import { Component } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTwitter, faDiscord } from '@fortawesome/free-brands-svg-icons'; // Importer uniquement les icônes nécessaires
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-social-media',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './social-media.component.html',
  styleUrl: './social-media.component.css'
})
export class SocialMediaComponent {
  constructor(library: FaIconLibrary) {
    library.addIcons(faTwitter, faDiscord, faGithub, faLinkedin); // Ajouter uniquement les icônes spécifiques
  }
}
