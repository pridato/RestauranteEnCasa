import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from 'src/app/core/models/pedido';
import { RestService } from 'src/app/core/servicios/RestService.service';

@Component({
  selector: 'app-cocinero-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './cocinero-dashboard.component.html',
  styleUrl: './cocinero-dashboard.component.css'
})
export class CocineroDashboardComponent implements OnInit {

  pedidos:Pedido[] = []
  

  constructor(private rest:RestService, private toast:ToastrService) {
   
  }
  ngOnInit(): void {
    this.getData()
    setInterval( () => {
      this.getData()
    }, 10000) // -> cada 10 segundos refrescamos los pedidos...
  }

  /**
   * llama a rest para devolver los pedidos
   */
  private getData() {
    this.rest.getPedidos()
    .subscribe(
      (data) => {
        if(data.length > this.pedidos.length) {
          // -> cada vez k recarguemos los pedidos si tiene más se muestra x un toast
          if(this.pedidos.length > 0)
            this.toast.info(`Se ha añadido a los pedidos un nuevo plato. `, 'Nuevo Pedido entrante')
          // solo modificamos el array si ha habido cambios. Sino no creo necesario un cambio de array ocupando espacio
          this.pedidos = data
          console.log(this.pedidos)
        }
        
      }
    )
  }

  /**
   * una vez realizado el pedido. Quedaría
   * En primer lugar que las camareras vayan a llevarlo al usuario que lo ha solicitado y guardarlo en bbdd como completado
   * Una vez el usuario complete la compra finaliza
   */
  marcarPedidoListo(pedido:Pedido) {
    this.pedidos = this.pedidos.filter(p => p !== pedido);
  }

  /**
   * 
   * @param date -> de mongo llega como string. Habría que parsearlo a date para despues sacar el tiempo
   * @returns devolvemos la fecha actual en horas y minutos
   */
  formatDate(date: Date): string {
    const fecha:Date = new Date(date)
    console.log(fecha)
    const hours = fecha.getHours().toString().padStart(2, '0');
    const minutes = fecha.getMinutes().toString().padStart(2, '0');
    const seconds = fecha.getSeconds().toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`;
  }
}
