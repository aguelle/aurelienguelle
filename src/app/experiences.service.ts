import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Experience {
  id?: string; // ID optionnel
  entreprise: string;
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

  getExperiences(): Observable<Experience[]> {
    const experiencesCollection = collection(this.firestore, 'experiences');
    return collectionData(experiencesCollection, { idField: 'id' }) as Observable<Experience[]>;
  }

  getExperienceById(id: string): Observable<Experience | undefined> {
    const experienceDoc = doc(this.firestore, `experiences/${id}`);
    return docData(experienceDoc, { idField: 'id' }) as Observable<Experience | undefined>;
  }

  deleteExperience(id: string): Promise<void> {
    const experienceDoc = doc(this.firestore, `experiences/${id}`);
    return deleteDoc(experienceDoc);
  }

  updateExperience(id: string, experience: Experience): Promise<void> {
    const experienceDoc = doc(this.firestore, `experiences/${id}`);
    return updateDoc(experienceDoc, { ...experience });
  }
}