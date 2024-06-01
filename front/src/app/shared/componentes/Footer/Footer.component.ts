import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Footer.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class FooterComponent {
  fecha:number = new Date().getFullYear();
 }
