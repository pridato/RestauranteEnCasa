import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import { GuardarFechaComponent } from './dialogGuardar/guardar-fecha.component';

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [ MatCardModule, MatDatepickerModule, GuardarFechaComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './reservas.component.html',
  styleUrl: './reservas.component.css'
})
export class ReservasComponent {
 
  selected!: Date | null;

  mostrarDialog:boolean = false

  recibirDialog(event:boolean) {
    console.log(event)
    this.mostrarDialog = event
  }

}
