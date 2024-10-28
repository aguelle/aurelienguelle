import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MusicService } from '../music.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-music',
  standalone: true,
  imports: [CommonModule,RouterModule, RouterLink, RouterLinkActive, FontAwesomeModule],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css'
})
export class MusicComponent  implements OnInit {

  @ViewChild('audioPlayer', { static: true }) audioPlayer!: ElementRef<HTMLAudioElement>;

  isPlaying = false;
  currentTrackIndex = 0;
  tracks: any[] = [];
  currentTrack: any;
  trackProgress: number = 0;
  

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.musicService.getTracks().subscribe((data: any[]) => {
      this.tracks = data;
      if (this.tracks.length > 0) {
        this.currentTrack = this.tracks[0];
        this.audioPlayer.nativeElement.src = this.currentTrack.url; // Utilise `audioPlayer`
      }
    });
  }

  playTrack(track?: { url: string }) {
    if (track && this.audioPlayer.nativeElement.src !== track.url) {
      this.audioPlayer.nativeElement.src = track.url;
      this.currentTrack = track;
    }
    this.audioPlayer.nativeElement.play();
    this.isPlaying = true;
  }

  pauseTrack() {
    this.audioPlayer.nativeElement.pause();
    this.isPlaying = false;
  }

  nextTrack() {
    const currentIndex = this.tracks.indexOf(this.currentTrack);
    const nextIndex = (currentIndex + 1) % this.tracks.length;
    this.playTrack(this.tracks[nextIndex]);
  }

  previousTrack() {
    const currentIndex = this.tracks.indexOf(this.currentTrack);
    const previousIndex = (currentIndex - 1 + this.tracks.length) % this.tracks.length;
    this.playTrack(this.tracks[previousIndex]);
  }

  onTrackEnd() {
    this.nextTrack();
  }

  updateProgress() {
    const currentTime = this.audioPlayer.nativeElement.currentTime;
    const duration = this.audioPlayer.nativeElement.duration;
    this.trackProgress = (currentTime / duration) * 100;
  }
  
}