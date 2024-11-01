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
import { Component } from '@angular/core';
import { ExperienceFormComponent } from './admin/experience-form/experience-form.component';
import { MusicFormComponent } from './admin/music-form/music-form.component';
import { RealisationFormComponent } from './admin/realisation-form/realisation-form.component';
import { DiplomeFormComponent } from './admin/diplome-form/diplome-form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'experiences', component: ExperiencesComponent },
    { path: 'diplomes', component: DiplomesComponent },
    { path: 'realisations', component: RealisationsComponent},
    { path: 'contact', component: ContactComponent },
    { path: 'musique', component: MusicComponent }, // Route vers la section musique
    { path: 'login', component: LoginComponent },
    { 
        path: 'admin', 
        component: AdminComponent, 
        canActivate: [authGuard],
        children: [
            { path: 'experience-form', component: ExperienceFormComponent},
            { path: 'music-form', component: MusicFormComponent},
            { path: 'realisation-form', component: RealisationFormComponent},
            { path: 'diplome-form', component: DiplomeFormComponent}

        ]
    },
    { path: '**', redirectTo: '' } // Redirection par défaut

];
