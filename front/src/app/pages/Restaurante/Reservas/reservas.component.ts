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

  aniadirCalendario() {
    // invocamos la api de calendar para añdir la fecha del usuario...
    const titulo = 'Reserva Tu Restaurante En Casa';
    const localizacion = 'Alcalá de Henares';
    const detalles = '';

    if (this.selected) {
      const startDate = this.selected.toISOString().slice(0, 10);
      const startTime = this.selected.toISOString().slice(11, 16);

      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(titulo)}&dates=${startDate}T${startTime}/${startDate}T${startTime}&details=${encodeURIComponent(detalles)}&location=${encodeURIComponent(localizacion)}`;
      
      // Abrir la URL en una nueva ventana
      // window.open(googleCalendarUrl, '_blank');
    }
  }

  aniadirCalendarioApple() {
    if (this.selected) {
      const startDate = this.selected.toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z'; // Formatear la fecha de inicio en el formato necesario para el Calendario de Apple
      const endDate = new Date(this.selected.getTime() + 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z'; // Añadir 1 hora a la fecha de inicio para obtener la fecha de finalización y formatearla

      const title = 'Reserva Tu Restaurante En Casa';
      const location = 'Alcalá de Henares';
      const details = '';

      const appleCalendarUrl = `https://www.icloud.com/calendar/event?start=${startDate}&end=${endDate}&summary=${encodeURIComponent(title)}&location=${encodeURIComponent(location)}&description=${encodeURIComponent(details)}`;

      // Abrir la URL en una nueva ventana
      // window.open(appleCalendarUrl, '_blank');
    }
  }

}
