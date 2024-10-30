import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { DiplomesService, Diplome } from '../../diplomes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diplome-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './diplome-form.component.html',
  styleUrl: './diplome-form.component.css'
})
export class DiplomeFormComponent implements OnInit {
  diplomeForm: FormGroup;
  diplomes: Diplome[] = [];
  editingDiplomeId: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private diplomesService: DiplomesService,
    private firestore: Firestore
  ) {
    this.diplomeForm = this.fb.group({
      competences: ['', Validators.required],
      date: ['', Validators.required],
      ecole: ['', Validators.required],
      lieu: ['', Validators.required],
      nom: ['', Validators.required],
      siteWeb: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.diplomesService.getDiplomes().subscribe((diplomes) => {
      this.diplomes = diplomes;
    });
  }
  async addDiplome() {
    if (this.diplomeForm.invalid) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const diplome: Diplome = this.diplomeForm.value;

    // Convertir les compétences en tableau si c'est une chaîne
    if (typeof diplome.competences === 'string') {
      diplome.competences = (diplome.competences as string).split(',').map(c => c.trim());
    }

    try {
      if (this.editingDiplomeId) {
        await this.diplomesService.updateDiplome(this.editingDiplomeId, diplome);
        alert('Diplôme modifié avec succès');
      } else {
        const diplomesRef = collection(this.firestore, 'diplomes');
        await addDoc(diplomesRef, diplome);
        alert('Diplôme ajouté avec succès');
      }
      this.diplomeForm.reset();
      this.editingDiplomeId = null;
    } catch (error) {
      console.error('Erreur lors de l\'ajout ou de la modification du diplôme: ', error);
      alert('Erreur lors de l\'ajout ou de la modification du diplôme. Veuillez réessayer.');
    }
  }

  editDiplome(diplome: Diplome) {
    this.editingDiplomeId = diplome.id || ''; // Gérer le cas où id est undefined
    this.diplomeForm.patchValue({
      ...diplome,
      competences: diplome.competences.join(', ') // Convertir le tableau en chaîne pour le formulaire
    });
  }

  async deleteDiplome(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce diplôme ?')) {
      try {
        await this.diplomesService.deleteDiplome(id);
        alert('Diplôme supprimé avec succès');
      } catch (error) {
        console.error('Erreur lors de la suppression du diplôme: ', error);
        alert('Erreur lors de la suppression du diplôme. Veuillez réessayer.');
      }
    }
  }
}
