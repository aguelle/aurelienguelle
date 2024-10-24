import { Component, OnInit } from '@angular/core';
import { MusicService } from '../music.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule,RouterModule, RouterLink, RouterLinkActive,],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent  implements OnInit {
  tracks: any[] = [];

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.musicService.getTracks().subscribe((data) => {
      this.tracks = data;
    });
  }
}