import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkMode: boolean = false;

  constructor() {
    this.loadTheme();
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.saveTheme();
    this.applyTheme();
  }

  private applyTheme() {
    if (this.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }

  private saveTheme() {
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
  }

  private loadTheme() {
    const storedTheme = localStorage.getItem('darkMode');
    if (storedTheme) {
      this.darkMode = JSON.parse(storedTheme);
      this.applyTheme();
    }
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }

}
