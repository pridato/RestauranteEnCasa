import { Component, effect } from '@angular/core';
import { StorageService } from 'src/app/core/servicios/storage.service';
import { TiposcomidaComponent } from './tiposComidas/tiposcomida.component';
import { IComida } from 'src/app/core/models/comida';
import { RouterLink } from '@angular/router';
import { RestService } from 'src/app/core/servicios/RestService.service';

@Component({
  selector: 'app-comidas',
  standalone: true,
  imports: [TiposcomidaComponent, RouterLink],
  templateUrl: './comidas.component.html',
  styleUrl: './comidas.component.css'
})
export class ComidasComponent {
  
  comidas:IComida[] = []

  constructor(private storage:StorageService, private rest:RestService) {
    // pendiente al cambio de ruta actualizar a travñes del parametro y siempre mandarlo
    this.comidas = this.storage.comidas().filter(comida => !comida.tipo.match(/^b-/));
    console.log('peti')
    let comidas = this.rest.obtenerComidas()
    comidas.subscribe(
      (comidas) => {
        this.comidas = comidas
      }
    )
  }
}
