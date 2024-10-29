import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
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


  constructor(
    private fb: FormBuilder,
    private realisationsServices: RealisationsService,
    private firestore: Firestore
  ) {
    this.realisationForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      visuel: ['']
    });
  }

  ngOnInit() {
    this.realisationsServices.getRealisations().subscribe((realisations) => {
      this.realisations = realisations;
    });
  }

  async addRealisation() {
    if (this.realisationForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;    }
    
      const realisation: Realisation = this.realisationForm.value;

      try {
        if (this.editingRealisationId) {
          await this.realisationsServices.updateRealisation(this.editingRealisationId, realisation);
          alert('Réalisation modifiée avec succès');
        } else {
          const realisationsRef = collection(this.firestore, 'realisations');
          await addDoc(realisationsRef, realisation);
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