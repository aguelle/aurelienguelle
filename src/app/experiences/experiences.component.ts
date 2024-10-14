import { Component, OnInit } from '@angular/core';
import { ExperiencesService, Experience } from '../experiences.service';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experiences.component.html',
  styleUrl: './experiences.component.css'
})
export class ExperiencesComponent implements OnInit{
  experiences: Experience[] = [];

  constructor(private experiencesService: ExperiencesService) {}

  ngOnInit(): void {
    this.experiencesService.getExperiences().pipe(
      map((data: Experience[]) => 
        data.sort((a, b) => {
          const dateA = a.dateFin ? new Date(a.dateFin).getTime() : new Date().getTime();
          const dateB = b.dateFin ? new Date(b.dateFin).getTime() : new Date().getTime();
          return dateB - dateA; 
        })
      )
    ).subscribe((sortedExperiences) => {
      this.experiences = sortedExperiences;
    });
  }
}
