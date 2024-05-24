import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ComidaPedido } from 'src/app/core/models/ComidaPedido';
import { ICliente } from 'src/app/core/models/cliente';
import { Pedido } from 'src/app/core/models/pedido';
import { RestService } from 'src/app/core/servicios/RestService.service';
import { CamareroDashboardService } from 'src/app/core/servicios/camarero-dashboard.service';
import { SpinnerComponent } from 'src/app/shared/componentes/spinner/spinner.component';
import { mesas } from 'src/app/shared/globales/globales';

@Component({
  selector: 'app-camarero-dashboard',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './camarero-dashboard.component.html',
  styleUrl: './camarero-dashboard.component.css'
})
export class CamareroDashboardComponent {

  mesas:number[] = mesas
  pedidos:Pedido[] = []

  mesasOcupadas:number[] = []

  constructor(private camareroSvc: CamareroDashboardService, private rest:RestService, private toastr:ToastrService) {
    // every 20 seconds
    this.getPedidos()
    setInterval(() => {
      this.getPedidos()
    }, 20000)
  }

  /**
   * metodo para obtener los pedidos de la base de datos
   */
  getPedidos() {
    this.camareroSvc.cargarPedidos().subscribe(pedidos => {
      console.log(pedidos)
      // añadir al array el nuevo array solo los cambios. Por ejem si se añade un pedido nuevo o si se elimina
      this.comprobarCambiosPedido(pedidos);
      this.marcarMesaComoOcupadas()
      
      // lo mismo que en el dashboard de cocinero, el nombre del usuario y de las comidas tendremos que recuperarlas de rest
      this.pedidos.forEach(pedido => {
        const $user = this.rest.obtenerClienteId(pedido.usuarioId)
        $user.subscribe((data: ICliente) => pedido.nombreUsuario = data.nombre)

        pedido.comidas.forEach(comida => {
          const $comida = this.rest.obtenerComida(comida.comidaId)
          $comida.subscribe((data) => comida.nombreComida = data.nombre)
        })
      })  


      
    })
  }

  /**
   * metodo para actualizar el pedido sin tenerlo que recargar todo de nuevo
   * @param pedidos 
   */
  comprobarCambiosPedido(pedidos:Pedido[]) {
    const nuevosPedidos = pedidos.filter(pedido => !this.pedidos.includes(pedido));
    this.pedidos.push(...nuevosPedidos);

    // 2º paso: comprobar si hay pedidos que ya no están
    const pedidosEliminados = this.pedidos.filter(pedido => !pedidos.includes(pedido));
    pedidosEliminados.forEach(pedido => {
      const index = this.pedidos.indexOf(pedido);
      this.pedidos.splice(index, 1);
    });
  }

  marcarMesaComoOcupadas() {
    // cada pedido tiene marcadio una mesa, está marcarla
    this.pedidos.forEach(pedido => {
      this.mesasOcupadas.push(pedido.mesa)
    })
  }

  comprobarMesaOcupada(mesa:number):boolean {
    return this.mesasOcupadas.includes(mesa)
  }

  getComidasByMesa(mesa:number): ComidaPedido[] {
    const pedido = this.pedidos.find(pedido => pedido.mesa === mesa)
    return pedido?.comidas || []
  }

  /**
   * metodo para marcar un pedido como completado 
   * @param mesa index de la mesa señalada
   */
  marcarPedidoCompletado(mesa:number) {
    const pedido = this.pedidos.find(pedido => pedido.mesa === mesa)
    pedido!.estado = 'Pendiente Pago'
    // enviar a rest para actualizar el estado 
    this.camareroSvc.actualizarPedido(pedido!).subscribe(
      (data) => {
          this.toastr.success('Pedido completado')
          // eliminar el pedido de la lista
          // volvemos a setear el numero a la mesa en vez del nombre de la mesa
          this.mesasOcupadas = this.mesasOcupadas.filter(m => m !== mesa)
          this.getPedidos()
      }
    )
  }
}
