// music.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
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
}