import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Realisation {
  date:string;
  description: string;
  nom: string;
  visuel:string;
  webSite: string;
}

@Injectable({
  providedIn: 'root'
})
export class RealisationsService {

  constructor(private firestore: Firestore) {}

  getRealisations(): Observable<any[]> {
    const realisationsCollection = collection(this.firestore, 'realisations');
    return collectionData(realisationsCollection, { idField: 'id' }) as Observable<any[]>;
  }
}
