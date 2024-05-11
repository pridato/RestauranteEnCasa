import { Component } from '@angular/core';
import { StorageService } from 'src/app/core/servicios/storage.service';
import { TiposcomidaComponent } from './tiposComidas/tiposcomida.component';
import { IComida } from 'src/app/core/models/comida';
import { RouterLink } from '@angular/router';
import { RestService } from 'src/app/core/servicios/RestService.service';
import { SpinnerComponent } from 'src/app/shared/componentes/spinner/spinner.component';
import { SpinnerService } from 'src/app/core/servicios/spinner.service';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-comidas',
  standalone: true,
  imports: [TiposcomidaComponent, RouterLink, SpinnerComponent, CommonModule, MatPaginatorModule],
  providers: [SpinnerService],
  templateUrl: './comidas.component.html',
  styleUrl: './comidas.component.css'
})
export class ComidasComponent {
  
  comidas:IComida[] = []

  constructor(private storage:StorageService, private rest:RestService, public spinner:SpinnerService) {
    
    // pendiente al cambio de ruta actualizar a travñes del parametro y siempre mandarlo
    this.spinner.show()
    const $_comidas = this.rest.obtenerComidas()
    $_comidas.subscribe(
      
      (comidas:IComida[]) => { 
        this.storage.guardarComidas(comidas)
        this.comidas = comidas
        this.spinner.hide()
      }
    ),
    (error: any) => console.log(error)
  }
}
