import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Ajustez le chemin si nécessaire
import { environment } from './environments/environment'; // Ajustez le chemin si nécessaire

import { provideFirebaseApp, initializeApp } from '@angular/fire/app'; // Nouvelle façon d'importer Firebase App
import { provideFirestore, getFirestore } from '@angular/fire/firestore'; // Importez Firestore ici
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Initialisation de Firebase App
    provideFirestore(() => getFirestore()), // Initialisation de Firestore
    ReactiveFormsModule, provideAnimationsAsync() // Fournir ReactiveFormsModule
  ]
});
