import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  scrollToComponent(component: string): void {
    const element = document.getElementsByTagName(component)[0];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

  constructor() { }
}
