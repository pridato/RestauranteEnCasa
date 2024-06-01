import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ThemeToggleService } from 'src/app/core/servicios/ThemeToggle.service';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './icon.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class IconComponent { 

  style = 'fa-solid fa-sun text-4xl'
  isBlack:boolean = false;

  constructor(private themeService:ThemeToggleService) { }

  toggleTheme(){
    const theme = this.isBlack ? 'dark' : 'light';
    this.style = this.isBlack ? 'fa-solid fa-sun text-4xl' : 'fa-solid fa-moon text-4xl'
    this.themeService.switchTheme(theme)
    this.isBlack = !this.isBlack;
    console.log(theme)
  }
}
