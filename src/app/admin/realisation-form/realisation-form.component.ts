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
  selectedFile: File | null = null; // Pour stocker le fichier sélectionné


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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.selectedFile = input.files[0]; // Stockez le fichier sélectionné
    }
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
          // Mode édition : met à jour avec ou sans nouveau visuel
          await this.realisationsServices.updateRealisation(this.editingRealisationId, realisation, this.selectedFile || undefined);
          alert('Réalisation modifiée avec succès');
        } else {
          // Mode ajout : ajoute une nouvelle réalisation avec un visuel obligatoire
          if (this.selectedFile) {
            await this.realisationsServices.addRealisation(realisation, this.selectedFile);
            alert('Réalisation ajoutée avec succès');
          } else {
            alert('Veuillez sélectionner une image pour la réalisation.');
            return;
          }
        }
    
        // Réinitialisation du formulaire après ajout ou modification
        this.realisationForm.reset();
        this.editingRealisationId = null;
        this.selectedFile = null;
    
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