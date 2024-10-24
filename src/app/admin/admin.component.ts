import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore'
import { ReactiveFormsModule } from '@angular/forms';
import { ExperiencesService, Experience } from '../experiences.service'; // Assurez-vous que le chemin est correct
import { CommonModule } from '@angular/common';


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

  constructor(
    private auth: Auth, 
    private router: Router,
    private fb: FormBuilder, 
    private firestore: Firestore,
    private experiencesService: ExperiencesService
  ) {
    // Initialisation du formulaire avec les champs de l'interface Experience
    this.articleForm = this.fb.group({
      entreprise: ['', Validators.required],
      poste: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: [''], // Optionnel
      missions: ['', Validators.required], // Vous pouvez ajuster pour accepter un tableau
      logo: [''], // Optionnel
      lieu: ['', Validators.required],
      siteWeb: [''] // Optionnel
    });
  }

  ngOnInit() {
    // Récupérer les expériences dès que le composant est initialisé
    this.experiencesService.getExperiences().subscribe((experiences) => {
      this.experiences = experiences;
    });
  }

  // Méthode pour ajouter ou modifier une expérience
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
        // Modification de l'expérience existante
        await this.experiencesService.updateExperience(this.editingExperienceId, article);
        alert('Expérience modifiée avec succès');
      } else {
        // Ajout d'une nouvelle expérience
        const experiencesRef = collection(this.firestore, 'experiences');
        await addDoc(experiencesRef, article);
        alert('Expérience ajoutée avec succès');
      }
      this.articleForm.reset();
      this.editingExperienceId = null; // Réinitialise l'édition
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la modification de l\'expérience: ', error);
      alert('Erreur lors de l\'ajout ou de la modification de l\'expérience. Veuillez réessayer.');
    }
  }

  // Remplit le formulaire avec les données de l'expérience à éditer
  editExperience(experience: any) {
    this.editingExperienceId = experience.id; // Stocke l'ID pour l'édition
    this.articleForm.patchValue({
      ...experience,
      missions: experience.missions.join(', ') // Convertir en chaîne pour l'affichage
    });
  }

  // Suppression d'une expérience
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

  // Déconnexion de l'utilisateur
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
