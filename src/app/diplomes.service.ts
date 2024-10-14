import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
export class DiplomesService {

  constructor(private firestore: Firestore) {}

  getDiplomes(): Observable<any[]> {
    const diplomesCollection = collection(this.firestore, 'diplomes');
    return collectionData(diplomesCollection, { idField: 'id' }) as Observable<any[]>;
  }
}
