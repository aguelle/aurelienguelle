import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { MusicService } from '../../music.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-music-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './music-form.component.html',
  styleUrl: './music-form.component.css'
})
export class MusicFormComponent {
  @Output() musicAdded = new EventEmitter<void>();

  trackForm: FormGroup;
  selectedAlbumArt: File | null = null;
  selectedMp3: File | null = null;
  tracks$: Observable<any[]> | undefined;
  editingTrackId: string | null = null;  // ID du morceau en cours d'édition

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private storage: Storage,
    private musicService: MusicService
  ) {
    this.trackForm = this.fb.group({
      artist: ['', Validators.required],
      title: ['', Validators.required],
      albumArt: [''],
      url: [''],
    });
  }

  ngOnInit() {
    this.fetchTracks();
  }

  fetchTracks() {
    this.tracks$ = this.musicService.getTracks();
  }

  async addTrack() {
    if (this.trackForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const trackData = this.trackForm.value;

    try {
      if (this.selectedAlbumArt) {
        const albumArtRef = ref(this.storage, `albumArt/${Date.now()}_${this.selectedAlbumArt.name}`);
        const albumArtSnapshot = await uploadBytes(albumArtRef, this.selectedAlbumArt);
        trackData.albumArt = await getDownloadURL(albumArtSnapshot.ref);
      }

      if (this.selectedMp3) {
        const mp3Ref = ref(this.storage, `tracks/${Date.now()}_${this.selectedMp3.name}`);
        const mp3Snapshot = await uploadBytes(mp3Ref, this.selectedMp3);
        trackData.url = await getDownloadURL(mp3Snapshot.ref);
      }

      if (this.editingTrackId) {
        // Mise à jour du morceau existant
        await this.musicService.updateTrack(this.editingTrackId, trackData);
        alert('Morceau mis à jour avec succès');
      } else {
        // Ajout d'un nouveau morceau
        const tracksRef = collection(this.firestore, 'tracks');
        await addDoc(tracksRef, trackData);
        alert('Morceau ajouté avec succès');
      }

      this.resetForm();
      this.musicAdded.emit();

    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la mise à jour du morceau: ', error);
      alert('Erreur lors de l\'ajout ou de la mise à jour du morceau. Veuillez réessayer.');
    }
  }

  editTrack(track: any) {
    this.editingTrackId = track.id ?? null; // Assurez-vous que si id est undefined, il devient null
    this.trackForm.patchValue(track);
  }

  async deleteTrack(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce morceau ?')) {
      try {
        await this.musicService.deleteTrack(id);
        alert('Morceau supprimé avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression du morceau: ', error);
        alert('Erreur lors de la suppression du morceau. Veuillez réessayer.');
      }
    }
  }

  private resetForm() {
    this.trackForm.reset();
    this.selectedAlbumArt = null;
    this.selectedMp3 = null;
    this.editingTrackId = null;  // Réinitialisation de l'ID d'édition
  }

  onFileSelected(event: Event, type: 'albumArt' | 'url') {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (type === 'albumArt') {
        this.selectedAlbumArt = file;
      } else if (type === 'url') {
        this.selectedMp3 = file;
      }
    }
  }
}