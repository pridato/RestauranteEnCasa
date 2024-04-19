import { Component } from '@angular/core';
import { mesas } from 'src/app/shared/globales/globales';

@Component({
  selector: 'app-camarero-dashboard',
  standalone: true,
  templateUrl: './camarero-dashboard.component.html',
  styleUrl: './camarero-dashboard.component.css'
})
export class CamareroDashboardComponent {

  mesas:number[] = mesas
}
