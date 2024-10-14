import { Injectable, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private firestore: Firestore = inject(Firestore);

  constructor() {}

  sendMessage(message: { firstName: string; lastName: string; content: string }) {
    const messagesCollection = collection(this.firestore, 'messages');
    
    return addDoc(messagesCollection, message)
    .then(() => {
      console.log('Message envoyé avec succès');
    })
    .catch((error) => {
      console.error('Erreur lors de l\'envoi du message :', error);
      throw error; // Renvoyer l'erreur pour la gestion au niveau du composant
    });;
  }
}
