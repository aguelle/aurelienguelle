import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Ajustez le chemin si nécessaire
import { environment } from './environments/environment'; // Ajustez le chemin si nécessaire
import { appConfig } from './app/app.config'; // Importez votre configuration

if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
