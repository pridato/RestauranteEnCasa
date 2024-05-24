import { Component, Input, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IComida } from "src/app/core/models/comida";
import { RestService } from "src/app/core/servicios/RestService.service";
import { StorageService } from "src/app/core/servicios/storage.service";

@Component({
  selector: "app-detallecomida",
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: "./detallecomida.component.html",
  styleUrl: "./detallecomida.component.css",
})
export class DetallecomidaComponent {
  @Input("id") id!: string;

  private toastr = inject(ToastrService);
  private rest = inject(RestService);
  public storage = inject(StorageService);

  comida!: IComida;
  elementoComida!: { comida: IComida; cantidad: number };

  constructor() {}

  ngOnInit() {
    this.rest.obtenerComida(this.id).subscribe((comida: IComida) => {
      this.comida = comida;
      this.elementoComida = { comida: this.comida, cantidad: 1 };
    });
  }

  showPedido: boolean = false; // mostrar o no dialog para seleccionar mesa
  tableSelected!: number; // mesa seleccionada

  /**
   * metodo para alternar entre mostrar y no el aviso de tabla
   * @returns
   */
  comprar() {
    // guardamos en tableSelected lo que haya por si mostramos o no la mesa
    // si se ha guardado la mesa guaramos la compra sino mostramos la mesa
    if (this.storage.cliente().mesa) {
      // si ya existe pasamos a la compra sino mostramos la mesa...
      this.aceptarCompra();
    } else {
      this.showPedido = !this.showPedido;
    }
  }

  /**
   * metodo para aceptar la compra y guardar el numero de mesas
   *
   */
  aceptarCompra() {
    if(this.tableSelected > 12 || this.tableSelected < 1) {
      this.toastr.error("Mesa no existente, selecciona una entre 1 y 12", "Error");
      this.showPedido = !this.showPedido;
      return;
    }
    // en el boton de aceptar añadimos el ocultar y listooo
    // si ya hemos guardado 1 vez la tabla no reescribimos el valor
    if(this.tableSelected) 
      this.storage.cliente().mesa = this.tableSelected 

    this.storage.guardarComidasCompradas(this.elementoComida);
    this.toastr.success(
      `Comida guardada ${this.elementoComida.comida.nombre}, revise sus favoritos para procesar el pedido`,
      "Item añadido a gustado"
    );
  }
}
