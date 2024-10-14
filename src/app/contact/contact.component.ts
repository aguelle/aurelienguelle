import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../contact.service'; 
import { NotificationComponent } from '../notification/notification.component';
import { CommonModule } from '@angular/common';
import { SocialMediaComponent } from "../social-media/social-media.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, NotificationComponent, CommonModule, SocialMediaComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  messageSent: boolean = false; 

  constructor(private fb: FormBuilder, private contactService: ContactService) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.contactService.sendMessage(this.contactForm.value)
        .then(() => {
          console.log('Message envoyé avec success!');
          this.messageSent = true;
          this.contactForm.reset();
        })
        .catch(error => {
          console.error('Erreur lors de l`envoie du message: ', error);
        });
    }
  }
}
