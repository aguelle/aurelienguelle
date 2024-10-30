// music.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, deleteDoc, updateDoc  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  constructor(private firestore: Firestore) {}

  getTracks(): Observable<any[]> {
    const tracksCollection = collection(this.firestore, 'tracks');
    return collectionData(tracksCollection, { idField: 'id' });
  }
  // Supprimer un morceau
  async deleteTrack(id: string): Promise<void> {
    const trackDocRef = doc(this.firestore, `tracks/${id}`);
    await deleteDoc(trackDocRef);
  }

  // Mettre à jour un morceau
  async updateTrack(id: string, data: any): Promise<void> {
    const trackDocRef = doc(this.firestore, `tracks/${id}`);
    await updateDoc(trackDocRef, data);
  }
}