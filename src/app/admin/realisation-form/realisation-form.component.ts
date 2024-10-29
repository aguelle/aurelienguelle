import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-realisation-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './realisation-form.component.html',
  styleUrl: './realisation-form.component.css'
})
export class RealisationFormComponent {
  realisationForm: FormGroup;
  @Output() realisationAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.realisationForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      visuel: ['', Validators.required]
    });
  }

  async addRealisation() {
    if (this.realisationForm.invalid) return;
    
    const realisationsRef = collection(this.firestore, 'realisations');
    await addDoc(realisationsRef, this.realisationForm.value);
    this.realisationAdded.emit();
    this.realisationForm.reset();
  }
}