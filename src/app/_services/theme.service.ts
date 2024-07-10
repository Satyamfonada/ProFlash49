import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  applyTheme(theme: string): void {
    const root = document.documentElement;
    root.className = ''; // Reset all existing theme classes

    if (theme === 'dark') {
      root.classList.add('dark-theme');
    } 
    else if (theme === 'light') {
      root.classList.add('light-theme');
    }
    else if (theme === 'red') {
      root.classList.add('red-theme');
    }
    else if (theme === 'blue') {
      root.classList.add('blue-theme');
    }
  }
}
