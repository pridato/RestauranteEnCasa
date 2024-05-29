import { Component, effect } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/componentes/Footer/Footer.component';
import { HeaderComponent } from './shared/componentes/Header/header/header.component';
import { IconComponent } from './shared/componentes/themeIcon/icon.component';
import { StorageService } from './core/servicios/storage.service';
import { ComidasComponent } from './pages/Restaurante/Comidas/comidas.component';
import { ComidascompradasComponent } from './pages/Restaurante/Comidas/ComidasCompradas/comidascompradas.component';
import { ICliente } from './core/models/cliente';
import { SpinnerComponent } from './shared/componentes/spinner/spinner.component';
import { ChatComponent } from './pages/Chat/chat.component';
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
    ComidascompradasComponent,
    ChatComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto';

  menu:boolean = false
  showChat:boolean = false
  showPedido:boolean = false
  user:ICliente | null = null
  // enlace al dashborad del rol
  linkRol:string = ''

  mostrarNavbar: boolean = false;

  //
  
  constructor(private router:Router, private storage:StorageService) {
    effect(()=>{
      this.user = this.storage.cliente()
      this.linkRol = this.user.rol ? `Dashboard/${this.user.rol.toLowerCase()}` : ''
    })
    
  }

  onToggleMenu(menuState: boolean) {
    this.menu = menuState;
  }

  onTogglePedido(pedidoState: boolean) {
    this.showPedido = pedidoState;
  }

  togglePedido() {
    if (this.showPedido) {
      this.showPedido = false;
    }
  }

  logout() {
    this.storage.guardarJwt('')
    let cliente!:ICliente
    this.storage.guardarCliente(cliente)
    this.router.navigateByUrl('/Cliente/Login')
  }
/**
 * metodo que recibe el estado de la navbar del hijo
 * @param navbar 
 */
  recibirNavbar(navbar: boolean) {
    this.mostrarNavbar = navbar;
  }
}
