import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/componentes/Footer/Footer.component';
import { HeaderComponent } from './shared/componentes/Header/header/header.component';
import { IconComponent } from './shared/componentes/themeIcon/icon.component';
import { RestService } from './core/servicios/RestService.service';
import { IComida } from './core/models/comida';
import { StorageService } from './core/servicios/storage.service';
import { ComidasComponent } from './pages/Restaurante/Comidas/comidas.component';
import { ComidascompradasComponent } from './pages/Restaurante/Comidas/ComidasCompradas/comidascompradas.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink, 
    FooterComponent, 
    HeaderComponent, 
    IconComponent, 
    ComidasComponent,
    ComidascompradasComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto';

  menu:boolean = false
  pedido:boolean = false
  
  constructor(private rest:RestService, private storage:StorageService) {
    const $_comidas = this.rest.obtenerComidas()
    $_comidas.subscribe(
      (comidas:IComida[]) => this.storage.guardarComidas(comidas),
    ),
    (error: any) => console.log(error)
  }

  onToggleMenu(menuState: boolean) {
    this.menu = menuState;
  }

  onTogglePedido(pedidoState: boolean) {
    this.pedido = pedidoState;
  }
}
