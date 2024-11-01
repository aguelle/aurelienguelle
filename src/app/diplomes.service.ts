import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, deleteDoc, updateDoc  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Diplome {
  id?: string; // Id optionnel pour la modification
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

  
  getDiplomesById(id: string): Observable<Diplome | undefined> {
    const diplomeDoc = doc(this.firestore, `diplpomes/${id}`);
    return docData(diplomeDoc, { idField: 'id' }) as Observable<Diplome | undefined>;
  }

  deleteDiplome(id: string): Promise<void> {
    const diplomeDoc = doc(this.firestore, `diplpomes/${id}`);
    return deleteDoc(diplomeDoc);
  }

  updateDiplome(id: string, diplome: Diplome): Promise<void> {
    const diplomeDoc= doc(this.firestore, `diplpomes/${id}`);
    return updateDoc(diplomeDoc, { ...diplome });
  }

}
