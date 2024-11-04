import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { RealisationsService, Realisation } from '../../realisations.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-realisation-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './realisation-form.component.html',
  styleUrl: './realisation-form.component.css'
})
export class RealisationFormComponent implements OnInit {
  realisationForm: FormGroup;
  realisations: Realisation[] = [];
  editingRealisationId: string | null = null;

  availableTechnologies = [
    { label: 'Angular', value: 'angular' },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'PHP', value: 'php' },
    { label: 'SQL', value: 'sql' },
    { label: 'firebase', value: 'firebase' },
    { label: 'typescript', value: 'typescript' },
    // Ajoutez d'autres technologies si nécessaire
  ]


  constructor(
    private fb: FormBuilder,
    private realisationsServices: RealisationsService,
  ) {
    this.realisationForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      visuel: [''],
      technologies: this.fb.array(this.availableTechnologies.map(() => this.fb.control(false)))

    });
  }

  ngOnInit() {
    this.realisationsServices.getRealisations().subscribe((realisations) => {
      this.realisations = realisations;
    });
  }

  get technologies(): FormArray {
    return this.realisationForm.get('technologies') as FormArray;
  }

  async addRealisation() {
    if (this.realisationForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;    }

      const selectedTechnologies = this.availableTechnologies
      .filter((_, index) => this.technologies.at(index).value)
      .map(tech => tech.value);

      const realisation: Realisation = {
        ...this.realisationForm.value,
        technologies: selectedTechnologies
      };

      try {
        if (this.editingRealisationId) {
          await this.realisationsServices.updateRealisation(this.editingRealisationId, realisation);
          alert('Réalisation modifiée avec succès');
        } else {
          await this.realisationsServices.addRealisation(realisation); // Appel au service pour l'ajout
          alert('Réalisation ajoutée avec succès');
        }
        this.realisationForm.reset();
        this.editingRealisationId = null;
      } catch (error) {
        console.error('Erreur lors de l\'ajout ou de la modification de la réalisation: ', error);
        alert('Erreur lors de l\'ajout ou de la modification de la réalisation. Veuillez réessayer.');
      }
    }
  
    editRealisation(realisation: Realisation) {
      this.editingRealisationId = realisation.id ?? null; // Assurez-vous que si id est undefined, il devient null
      this.realisationForm.patchValue(realisation);

      if (realisation.technologies) {
        this.availableTechnologies.forEach((tech, index) => {
          this.technologies.at(index).setValue(realisation.technologies.includes(tech.value));
        });
      }
    }
  
    async deleteRealisation(id: string) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette réalisation ?')) {
        try {
          await this.realisationsServices.deleteRealisation(id);
          alert('Réalisation supprimée avec succès');
        } catch (error) {
          console.error('Erreur lors de la suppression de la réalisation: ', error);
          alert('Erreur lors de la suppression de la réalisation. Veuillez réessayer.');
        }
      }
    }
  }