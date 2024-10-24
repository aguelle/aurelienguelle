import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app'; // Nouvelle façon d'importer Firebase App
import { provideFirestore, getFirestore } from '@angular/fire/firestore'; // Importez Firestore ici
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { environment } from '../environments/environment'; // Ajustez le chemin si nécessaire
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Initialisation de Firebase
    provideFirestore(() => getFirestore()), // Initialisation de Firestore
    ReactiveFormsModule, // Fournir ReactiveFormsModule
    provideAnimationsAsync(),
    provideAuth(() => getAuth()),
    provideHttpClient() 
  ]
};
