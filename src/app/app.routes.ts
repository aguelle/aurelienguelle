import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { ContactComponent } from './contact/contact.component';
import { DiplomesComponent } from './diplomes/diplomes.component';
import { RealisationsComponent } from './realisations/realisations.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { MusicComponent } from './music/music.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'experiences', component: ExperiencesComponent },
    { path: 'diplomes', component: DiplomesComponent },
    { path: 'realisations', component: RealisationsComponent},
    { path: 'contact', component: ContactComponent },
    { path: 'musique', component: MusicComponent }, // Route vers la section musique
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminComponent, canActivate: [authGuard]},
    { path: '**', redirectTo: '' } // Redirection par défaut

];
