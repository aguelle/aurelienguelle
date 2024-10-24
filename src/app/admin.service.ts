import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Experience {
  entreprise:string;
  poste: string;
  dateDebut: string;
  dateFin?: string;
  missions: string[];
  logo: string;
  lieu: string;
  siteWeb: string;
}

export interface Realisation {
  date:string;
  description: string;
  nom: string;
  visuel:string;
  webSite: string;
}

export interface Diplome {
  date: string;
  ecole:string;
  lieu: string;
  nom:string;
  siteWeb: string;
  competences: string[];
}


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private firestore: Firestore) {}

  async addExperience(experience: Experience): Promise<void> {
    try {
      await addDoc(collection(this.firestore, 'experiences'), experience);
      console.log('Expérience ajoutée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'expérience :', error);
    }
  }

  async addDiplome(diplome: Diplome): Promise<void> {
    try {
      await addDoc(collection(this.firestore, 'diplomes'), diplome);
      console.log('Diplome ajouté avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du dipl$ome :', error);
    }
  }

  async addRealisation(realisation: Realisation): Promise<void> {
    try {
      await addDoc(collection(this.firestore, 'realisations'), realisation);
      console.log('Réalisation ajoutée avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la réalisation :', error);
    }
  }
  
    
}
