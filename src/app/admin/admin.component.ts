import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore'
import { ReactiveFormsModule } from '@angular/forms';
import { ExperiencesService, Experience } from '../experiences.service'; // Assurez-vous que le chemin est correct
import { CommonModule } from '@angular/common';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent implements OnInit {
  articleForm: FormGroup;
  experiences: any[] = [];
  editingExperienceId: string | null = null;
  trackForm: FormGroup;
  selectedAlbumArt: File | null = null;
  selectedMp3: File | null = null;

  constructor(
    private auth: Auth, 
    private router: Router,
    private fb: FormBuilder, 
    private firestore: Firestore,
    private experiencesService: ExperiencesService,
    private storage: Storage
  ) {
    this.articleForm = this.fb.group({
      entreprise: ['', Validators.required],
      poste: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: [''],
      missions: ['', Validators.required],
      logo: [''],
      lieu: ['', Validators.required],
      siteWeb: ['']
    });
    this.trackForm = this.fb.group({
      artist: ['', Validators.required],
      title: ['', Validators.required],
      albumArt: [''],
      url: [''],
    });
  }

  ngOnInit() {
    this.experiencesService.getExperiences().subscribe((experiences) => {
      this.experiences = experiences;
    });
  }

  async addArticle() {
    if (this.articleForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const article: Experience = this.articleForm.value;

    if (typeof article.missions === 'string') {
      article.missions = (article.missions as string).split(',').map(m => m.trim());
    }

    try {
      if (this.editingExperienceId) {
        await this.experiencesService.updateExperience(this.editingExperienceId, article);
        alert('Expérience modifiée avec succès');
      } else {
        const experiencesRef = collection(this.firestore, 'experiences');
        await addDoc(experiencesRef, article);
        alert('Expérience ajoutée avec succès');
      }
      this.articleForm.reset();
      this.editingExperienceId = null;
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la modification de l\'expérience: ', error);
      alert('Erreur lors de l\'ajout ou de la modification de l\'expérience. Veuillez réessayer.');
    }
  }

  editExperience(experience: any) {
    this.editingExperienceId = experience.id;
    this.articleForm.patchValue({
      ...experience,
      missions: experience.missions.join(', ')
    });
  }

  async deleteExperience(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette expérience ?')) {
      try {
        await this.experiencesService.deleteExperience(id);
        alert('Expérience supprimée avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'expérience: ', error);
        alert('Erreur lors de la suppression de l\'expérience. Veuillez réessayer.');
      }
    }
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

      this.trackForm.reset();
      this.selectedAlbumArt = null;
      this.selectedMp3 = null;

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

  logout() {
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Erreur lors de la déconnexion', error);
      });
  }
}
