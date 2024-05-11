import { Component } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import { GuardarFechaComponent } from './dialogGuardar/guardar-fecha.component';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toastr:ToastrService) {}

  handleDateChange(event: Date) {
    // si la fecha no es anterior a la actual
    if (event >= new Date()) {
      this.selected = event
      this.mostrarDialog = true
    } else {
      this.toastr.error('La fecha seleccionada no puede ser anterior a la actual', 'Error reservando')
    }
    
  }

  recibirDialog(event:boolean) {
    this.mostrarDialog = event
  }

}
