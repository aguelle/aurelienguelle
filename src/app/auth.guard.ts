import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);  // Injecter le service Firebase Auth
  const router = inject(Router); // Injecter le Router pour rediriger si non authentifié

  return new Observable<boolean>(observer => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        observer.next(true);  // Si l'utilisateur est connecté, accès autorisé
        observer.complete();
      } else {
        router.navigate(['/login']);  // Rediriger vers la page de connexion si non connecté
        observer.next(false);  // Accès refusé
        observer.complete();
      }
    });
  });
};
