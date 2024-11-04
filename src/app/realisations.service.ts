import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, deleteDoc, updateDoc, addDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { Observable } from 'rxjs';


export interface Realisation {
  id?: string; // ID optionnel
  date: string;
  description: string;
  nom: string;
  visuel?: string;
  webSite: string;
  technologies: string[];
}

@Injectable({
  providedIn: 'root'
})
export class RealisationsService {

  constructor(private firestore: Firestore,private storage: Storage) {}

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
  
  async updateRealisation(id: string, realisation: Realisation, file?: File): Promise<void> {
    const realisationDoc = doc(this.firestore, `realisations/${id}`);

    try {
      let downloadURL = realisation.visuel;

      // Si un nouveau fichier est passé, remplacez le visuel existant
      if (file) {
        const storageRef = ref(this.storage, `realisations/${file.name}`);
        await uploadBytes(storageRef, file);
        downloadURL = await getDownloadURL(storageRef);
      }

      // Mettre à jour le document avec les nouvelles données et URL du visuel
      await updateDoc(realisationDoc, { ...realisation, visuel: downloadURL });
      console.log("Réalisation mise à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la réalisation :", error);
      throw error;
    }
  }

  async addRealisation(realisation: Realisation, file: File): Promise<void> {
    const realisationsCollection = collection(this.firestore, 'realisations');
    
    try {
      // Téléchargez le fichier dans Firebase Storage
      const storageRef = ref(this.storage, `realisations/${file.name}`);
      await uploadBytes(storageRef, file);
      
      // Obtenez l'URL de téléchargement de l'image
      const downloadURL = await getDownloadURL(storageRef);

      // Créez la réalisation avec l'URL de l'image
      const newRealisation: Realisation = { ...realisation, visuel: downloadURL };
      
      await addDoc(realisationsCollection, newRealisation);
      console.log("Réalisation ajoutée avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la réalisation :", error);
      throw error;
    }
  }
}