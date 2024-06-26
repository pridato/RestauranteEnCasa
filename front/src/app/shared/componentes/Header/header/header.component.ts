import { Component, EventEmitter, Input, Output, effect } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ICliente } from "src/app/core/models/cliente";
import { BusquedaComidasService } from "src/app/core/servicios/busqueda-comidas.service";
import { StorageService } from "src/app/core/servicios/storage.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: "./header.component.html",
  styles: `
    nav {
      background-color: #2f695C;
    }
    .scale-in-tr{-webkit-animation:scale-in-tr .5s cubic-bezier(.25,.46,.45,.94) both;animation:scale-in-tr .5s cubic-bezier(.25,.46,.45,.94) both}    @-webkit-keyframes scale-up-tr{0%{-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:100% 0;transform-origin:100% 0}100%{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:100% 0;transform-origin:100% 0}}@keyframes scale-up-tr{0%{-webkit-transform:scale(.5);transform:scale(.5);-webkit-transform-origin:100% 0;transform-origin:100% 0}100%{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:100% 0;transform-origin:100% 0}}
    @-webkit-keyframes scale-in-tr{0%{-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:100% 0;transform-origin:100% 0;opacity:1}100%{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:100% 0;transform-origin:100% 0;opacity:1}}@keyframes scale-in-tr{0%{-webkit-transform:scale(0);transform:scale(0);-webkit-transform-origin:100% 0;transform-origin:100% 0;opacity:1}100%{-webkit-transform:scale(1);transform:scale(1);-webkit-transform-origin:100% 0;transform-origin:100% 0;opacity:1}}
    `
})
export class HeaderComponent {
  hacerBusqueda: boolean = false;

  @Output() emitirNavbar: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() menu: boolean = false;
  @Output() toggleMenu: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() pedido: boolean = false;
  @Output() togglePedido: EventEmitter<boolean> = new EventEmitter<boolean>();

  // Cada trabajador tiene una función en específico que es Dashboard/{rol} siempre que sean diferntes a usuario
  linkRol: string = "";

  cantidad: number = 0;
  user!: ICliente;
  mostrarOpcionesUsuario: boolean = false;

  busqueda: string = "";

  constructor(
    private storage: StorageService,
    private router: Router,
    private busquedaSvc: BusquedaComidasService
  ) {
    effect(() => {
      this.cantidad = this.storage.comidasCompradas().length;
      // comprobamos el objeto cliente. Si se ha logueado redirigimos a Cliente/Panel
      this.user = this.storage.cliente();
      this.linkRol = this.user?.rol
        ? `Dashboard/${this.user.rol.toLowerCase()}`
        : "";
    });

    // cada vez que se cambie la ruta mostrar opciones de usuario en false y además reseteamos el buscador
    this.router.events.subscribe(() => {
      this.mostrarOpcionesUsuario = false;
      this.busquedaSvc.setTextoABuscar("");
    });
  }

  toggleBusqueda() {
    this.hacerBusqueda = !this.hacerBusqueda;
  }

  handleSearch() {
    this.busquedaSvc.setTextoABuscar(this.busqueda);
  }

  abrirMenu() {
    this.toggleMenu.emit(!this.menu);
  }

  abrirFavoritos() {
    this.mostrarOpcionesUsuario = !this.mostrarOpcionesUsuario;
    this.togglePedido.emit(!this.pedido);
  }

  logout() {
    this.storage.guardarJwt("");
    let cliente!: ICliente;
    this.storage.guardarCliente(cliente);
    this.linkRol = "";
  }
}
