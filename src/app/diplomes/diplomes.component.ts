import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DiplomesService, Diplome } from '../diplomes.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-diplomes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diplomes.component.html',
  styleUrl: './diplomes.component.css'
})
export class DiplomesComponent implements OnInit{
diplomes: Diplome[] = [];

constructor(private diplomesService: DiplomesService) {}

ngOnInit(): void {
  this.diplomesService.getDiplomes().pipe(
    map((data: Diplome[]) => 
      data.sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : new Date().getTime();
        const dateB = b.date ? new Date(b.date).getTime() : new Date().getTime();
        return dateB - dateA; 
      })
    )
  ).subscribe((sortedDiplomes) => {
    this.diplomes = sortedDiplomes;
  });}

}
