import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


export interface Realisation {
  id?: string; // ID optionnel
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

  getRealisations(): Observable<Realisation[]> {
    const realisationsCollection = collection(this.firestore, 'realisations');
    return collectionData(realisationsCollection, { idField: 'id' }) as Observable<Realisation[]>;
  }

  getRealisationsById(id: string): Observable<Realisation | undefined> {
    const realisationDoc = doc(this.firestore, `realisations/${id}`);
    return docData(realisationDoc, { idField: 'id' }) as Observable<Realisation | undefined>;
  }

  deleteRealisation(id: string): Promise<void> {
    const realisationDoc = doc(this.firestore, `realisations/${id}`);
    return deleteDoc(realisationDoc);
  }

  updateRealisation(id: string, realisation: Realisation): Promise<void> {
    const realisationDoc = doc(this.firestore, `realisations/${id}`);
    return updateDoc(realisationDoc, { ...realisation });
  }

}
