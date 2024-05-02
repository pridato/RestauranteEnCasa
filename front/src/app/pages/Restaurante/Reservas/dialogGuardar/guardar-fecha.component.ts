import { Component, Input, OnInit } from '@angular/core';
import { DateFormatPipe } from "../../../../shared/pipes/date-format.pipe";
import { googleCalendarUrl } from 'src/app/shared/globales/globales';

@Component({
    selector: 'app-guardar-fecha',
    standalone: true,
    templateUrl: './guardar-fecha.component.html',
    styleUrl: './guardar-fecha.component.css',
    imports: [DateFormatPipe]
})
export class GuardarFechaComponent implements OnInit{

  @Input() fecha!:Date

  constructor() {}

  ngOnInit(): void {
  }

  guardarFecha() {
    // guardar la fecha en google calendar
    const fechaFormateada = this.fecha.toISOString().replace(/-|:|\.\d+/g, '');
    const url = googleCalendarUrl + `${fechaFormateada}/${fechaFormateada}&title=Reserva&location=Restaurante&trp=false&sprop=&sprop=name:`
    window.open(url, '_blank')
  }
}
