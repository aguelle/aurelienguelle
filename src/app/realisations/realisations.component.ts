import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RealisationsService, Realisation } from '../realisations.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-realisations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './realisations.component.html',
  styleUrl: './realisations.component.css'
})
export class RealisationsComponent implements OnInit {
realisations: Realisation[] = [];

technologyClasses: { [key: string]: string } = {
  angular: 'devicon-angular-plain ',
  html: 'devicon-html5-plain colored',
  css: 'devicon-css3-plain colored',
  javascript: 'devicon-javascript-plain colored',
  php: 'devicon-php-plain colored',
  sql: 'devicon-mysql-plain colored',
  firebase: 'devicon-firebase-plain colored' // Ajoutez ici d'autres technologies si nécessaire
};

constructor(private realisationsService: RealisationsService) {}
     // Ajout des icônes avec le nom correct

  ngOnInit(): void {
    this.realisationsService.getRealisations().pipe(
      map((data: Realisation[]) => 
        data.sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : new Date().getTime();
          const dateB = b.date ? new Date(b.date).getTime() : new Date().getTime();
          return dateB - dateA; 
        })
      )
    ).subscribe((sortedRealisations) => {
      this.realisations = sortedRealisations
    });}

    getTechnologyClass(technology: string): string {
      return this.technologyClasses[technology] || 'devicon-unknown-plain'; // Classe par défaut pour une technologie inconnue
    }

}
