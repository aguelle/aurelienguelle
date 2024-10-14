import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
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
}
