import { Component } from '@angular/core';
import { NavigateService } from '../navigate.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor(public navigateService: NavigateService) {}

}
