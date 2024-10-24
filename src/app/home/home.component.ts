import { Component } from '@angular/core';
import { NavigateService } from '../navigate.service';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { MusicComponent } from "../music/music.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, RouterLink, RouterLinkActive, MusicComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  constructor(public navigateService: NavigateService) {}

}
