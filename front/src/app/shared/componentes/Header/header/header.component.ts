import { Component, EventEmitter, Input, Output, effect } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ICliente } from 'src/app/core/models/cliente';
import { StorageService } from 'src/app/core/servicios/storage.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styles: `
    nav {
      background-color: #2f695C;
    }
  `,
})
export class HeaderComponent { 
  hacerBusqueda: boolean = false;

  @Output() emitirNavbar: EventEmitter<boolean> = new EventEmitter<boolean>();


  @Input()menu:boolean = false
  @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input()pedido:boolean = false
  @Output() togglePedido: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Cada trabajador tiene una función en específico que es Dashboard/{rol} siempre que sean diferntes a usuario
  linkRol:string = ''

  cantidad: number = 0;
  user!:ICliente
  mostrarOpcionesUsuario: boolean = false;

  constructor(private storage: StorageService, private router:Router){
    effect(()=>{
      this.cantidad = this.storage.comidasCompradas().length

      // comprobamos el objeto cliente. Si se ha logueado redirigimos a Cliente/Panel
      this.user = this.storage.cliente()
      this.linkRol = this.user.rol ? `Dashboard/${this.user.rol.toLowerCase()}` : ''
    })

    // cada vez que se cambie la ruta mostrar opciones de usuario en false
    this.router.events.subscribe(() => {
      this.mostrarOpcionesUsuario = false;
    });
  }



  toggleBusqueda() {
    this.hacerBusqueda = !this.hacerBusqueda;
  }

  abrirMenu() {
    this.toggleMenu.emit(!this.menu);
  }

  abrirFavoritos() {
    this.togglePedido.emit(!this.pedido);
  }



  logout() {
    this.storage.guardarJwt('')
    let cliente!:ICliente
    this.storage.guardarCliente(cliente)
    this.linkRol = ''
  }
}
