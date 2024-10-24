import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, deleteDoc, updateDoc } from '@angular/fire/firestore';
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

@Injectable({
  providedIn: 'root'
})
export class ExperiencesService {

  constructor(private firestore: Firestore) {}

  getExperiences(): Observable<any[]> {
    const experiencesCollection = collection(this.firestore, 'experiences');
    return collectionData(experiencesCollection, { idField: 'id' }) as Observable<any[]>;
  }
  getExperienceById(id: string): Observable<Experience> {
    const experienceDoc = doc(this.firestore, `experiences/${id}`);
    return docData(experienceDoc) as Observable<Experience>;
  }

  // Méthode pour supprimer une expérience
  deleteExperience(id: string): Promise<void> {
    const experienceDoc = doc(this.firestore, `experiences/${id}`);
    return deleteDoc(experienceDoc);
  }
  updateExperience(id: string, experience: Experience): Promise<void> {
    const experienceDoc = doc(this.firestore, `experiences/${id}`);
    return updateDoc(experienceDoc, { ...experience }); // Utilisation de updateDoc pour mettre à jour
  }
}
