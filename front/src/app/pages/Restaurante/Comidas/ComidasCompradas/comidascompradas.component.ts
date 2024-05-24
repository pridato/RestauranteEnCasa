import {
  Component,
  EventEmitter,
  Input,
  Output,
  effect,
  inject,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ComidaPedido } from "src/app/core/models/ComidaPedido";
import { IComida } from "src/app/core/models/comida";
import { Pedido } from "src/app/core/models/pedido";
import { RestService } from "src/app/core/servicios/RestService.service";
import { StorageService } from "src/app/core/servicios/storage.service";

@Component({
  selector: "app-comidascompradas",
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: "./comidascompradas.component.html",
  styleUrl: "./comidascompradas.component.css",
})
export class ComidascompradasComponent {
  private storage = inject(StorageService);
  private rest = inject(RestService);

  @Input() pedido: boolean = false;
  @Output() togglePedido: EventEmitter<boolean> = new EventEmitter<boolean>();
  private toastr = inject(ToastrService)

  showPedido: boolean = false; // mostrar o no dialog para seleccionar mesa
  tableSelected: number = 0; // mesa seleccionada

  public comidasCompradas = this.storage.recuperarComidasCompradas();

  constructor(private route:Router) {

    // si el usuario se está moviendo x la app, ocultar el pedido
    this.route.events.subscribe((event) => {
      this.emitirPedido()
    });
    
    // si no hay usuario conectado redirigir ocultarla
    if(!this.storage.cliente().nombre) {
      this.emitirPedido()
    }
    effect(() => {
      this.comidasCompradas = this.storage.recuperarComidasCompradas();
      console.log("new comidas compradas", this.comidasCompradas);
    });
  }

  /**
   * oculta el pedido, si está visible. Muestra el pedido si está oculto
   */
  emitirPedido() {
    // mandamos false siempre para evitar si está oculto mostrarlo x algun error 
    this.togglePedido.emit(false);
  }

  handleCantidad(
    operacion: string,
    comida: { comida: IComida; cantidad: number }
  ) {
    this.storage.actualizarComidasCompradas(comida, operacion);
    console.log(this.storage.comidasCompradas());
  }

  /**
   * envía todo el pedido actual a rest para guardarlo en mongo. Se guarda el pedido entero. Comidas y cantidad
   * con el id del usuario
   */
  realizarPedido() {

    if(this.storage.comidasCompradas().length === 0) {
      this.toastr.error(`No hay comidas guardadas`, `Error`)
      this.emitirPedido()
      return
    }
    // guardamos el id de la comida junto a su comida para enlazarlo en mongo
    let Idcomidas: ComidaPedido[] = [];
    let comidas: { comida: IComida; cantidad: number }[] = this.storage.comidasCompradas();

    for (let comida of comidas) {
      Idcomidas.push({ comidaId: comida.comida.id, cantidad: comida.cantidad, nombreComida: comida.comida.nombre });
    }
    // creamos un objeto pedido añadiendo el id del cliente guardado en storage y como estado en preparación
    let pedido: Pedido = {
      estado: "En Preparación",
      usuarioId: this.storage.recuperarCliente().id!,
      comidas: Idcomidas,
      mesa: this.storage.recuperarCliente().mesa!
    };

    let respuesta = this.rest.realizarPedido(pedido);
    respuesta.then((resp) => {
      // una vez hecho el pedido escondemos el navbar. Liberamos todas las comidas y mostramos mensaje.
      // A la hora del pago final recogemos de base de datos la cuenta total x usuario
      this.toastr.success(`Su Pedido ya está en proceso`, `Pedido en proceso `)
      this.storage.comidasCompradas.set([])
      this.emitirPedido()
      this.showPedido = !this.showPedido
    });
  }
}
