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

constructor(private realisationsService: RealisationsService) {}

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



}
