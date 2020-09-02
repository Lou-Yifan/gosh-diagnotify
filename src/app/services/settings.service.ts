import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  darkMode = false;

  constructor(private plt: Platform) { 
    this.plt.ready().then(() => {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      prefersDark.addListener(e => {
        // console.log('matches: ', e);
        this.setTheme(e.matches)
      })
    })
  } 

  toggleTheme() {
    this.darkMode = !this.darkMode;
    //console.log(this.darkMode);
    this.setTheme(this.darkMode);
  }

  setTheme(dark) {
    this.darkMode = dark;

    if(this.darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
  
}
