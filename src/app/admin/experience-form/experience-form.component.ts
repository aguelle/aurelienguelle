import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { ExperiencesService, Experience } from '../../experiences.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './experience-form.component.html',
  styleUrl: './experience-form.component.css'
})
export class ExperienceFormComponent implements OnInit {
  articleForm: FormGroup;
  experiences: Experience[] = [];
  editingExperienceId: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private experiencesService: ExperiencesService,
    private firestore: Firestore
  ) {
    this.articleForm = this.fb.group({
      entreprise: ['', Validators.required],
      poste: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: [''],
      missions: ['', Validators.required],
      lieu: ['', Validators.required],
      siteWeb: ['']
    });
  }

  ngOnInit() {
    this.experiencesService.getExperiences().subscribe((experiences) => {
      this.experiences = experiences;
    });
  }

  async addExperience() {
    if (this.articleForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const experience: Experience = this.articleForm.value;

    if (typeof experience.missions === 'string') {
      experience.missions = (experience.missions as string).split(',').map(m => m.trim());
    }

    try {
      if (this.editingExperienceId) {
        await this.experiencesService.updateExperience(this.editingExperienceId, experience);
        alert('Expérience modifiée avec succès');
      } else {
        const experiencesRef = collection(this.firestore, 'experiences');
        await addDoc(experiencesRef, experience);
        alert('Expérience ajoutée avec succès');
      }
      this.articleForm.reset();
      this.editingExperienceId = null;
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la modification de l\'expérience: ', error);
      alert('Erreur lors de l\'ajout ou de la modification de l\'expérience. Veuillez réessayer.');
    }
  }

  editExperience(experience: Experience) {
    this.editingExperienceId = experience.id || ''; // Gérer le cas où id est undefined
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
}