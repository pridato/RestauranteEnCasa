import {
  Component,
  EventEmitter,
  Input,
  Output,
  effect,
  inject,
} from "@angular/core";
import { RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IComida } from "src/app/core/models/comida";
import { Pedido } from "src/app/core/models/pedido";
import { RestService } from "src/app/core/servicios/RestService.service";
import { StorageService } from "src/app/core/servicios/storage.service";

@Component({
  selector: "app-comidascompradas",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./comidascompradas.component.html",
  styleUrl: "./comidascompradas.component.css",
})
export class ComidascompradasComponent {
  private storage = inject(StorageService);
  private rest = inject(RestService);

  @Input() pedido: boolean = false;
  @Output() togglePedido: EventEmitter<boolean> = new EventEmitter<boolean>();
  private toastr = inject(ToastrService)

  public comidasCompradas = this.storage.recuperarComidasCompradas();

  constructor() {
    effect(() => {
      this.comidasCompradas = this.storage.recuperarComidasCompradas();
      console.log("new comidas compradas", this.comidasCompradas);
    });
  }

  /**
   * emite el pedido y debería añadir a la base de datos el pedido realizado
   */
  emitirPedido() {
    this.togglePedido.emit(!this.pedido);
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
    // guardamos el id de la comida junto a su comida para enlazarlo en mongo
    let Idcomidas: { comidaId: string; cantidad: number }[] = [];
    let comidas: { comida: IComida; cantidad: number }[] =
      this.storage.comidasCompradas();

    for (let comida of comidas) {
      Idcomidas.push({ comidaId: comida.comida.id, cantidad: comida.cantidad });
    }
    // creamos un objeto pedido añadiendo el id del cliente guardado en storage y como estado en preparación
    let pedido: Pedido = {
      estado: "En Preparación",
      usuarioId: this.storage.recuperarCliente().id!,
      comidas: Idcomidas,
    };

    console.log(pedido);
    let respuesta = this.rest.realizarPedido(pedido);
    respuesta.then((resp) => {
      // una vez hecho el pedido escondemos el navbar. Liberamos todas las comidas y mostramos mensaje.
      // A la hora del pago final recogemos de base de datos la cuenta total x usuario
      this.toastr.success(`Su Pedido ya está en proceso`, `Pedido en proceso `)
      this.storage.comidasCompradas.set([])
      this.emitirPedido()
    });
  }
}
