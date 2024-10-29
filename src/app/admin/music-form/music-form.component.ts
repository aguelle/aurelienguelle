import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-music-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './music-form.component.html',
  styleUrl: './music-form.component.css'
})
export class MusicFormComponent {
  
  @Output() musicAdded = new EventEmitter<void>();

  trackForm: FormGroup;
  selectedAlbumArt: File | null = null;
  selectedMp3: File | null = null;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private storage: Storage
  ) {
    this.trackForm = this.fb.group({
      artist: ['', Validators.required],
      title: ['', Validators.required],
      albumArt: [''],
      url: [''],
    });
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

      const tracksRef = collection(this.firestore, 'tracks');
      await addDoc(tracksRef, trackData);
      alert('Morceau ajouté avec succès');

      // Reset du formulaire et des fichiers
      this.trackForm.reset();
      this.selectedAlbumArt = null;
      this.selectedMp3 = null;
      this.musicAdded.emit();  // Émet un événement pour informer l'ajout réussi

    } catch (error) {
      console.error('Erreur lors de l\'ajout du morceau: ', error);
      alert('Erreur lors de l\'ajout du morceau. Veuillez réessayer.');
    }
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