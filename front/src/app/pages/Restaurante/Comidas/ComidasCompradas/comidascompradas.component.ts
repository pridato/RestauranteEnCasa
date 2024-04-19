import { Component, EventEmitter, Input, Output, effect, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IComida } from 'src/app/core/models/comida';
import { StorageService } from 'src/app/core/servicios/storage.service';

@Component({
  selector: 'app-comidascompradas',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './comidascompradas.component.html',
  styleUrl: './comidascompradas.component.css'
})
export class ComidascompradasComponent {

  private storage = inject(StorageService)

  @Input()pedido:boolean = false
  @Output() togglePedido: EventEmitter<boolean> = new EventEmitter<boolean>();

  public comidasCompradas = this.storage.recuperarComidasCompradas()

  constructor() {
    effect(()=>{
      this.comidasCompradas = this.storage.recuperarComidasCompradas()
      console.log('new comidas compradas', this.comidasCompradas)

    })
  }

  emitirPedido() {
    this.togglePedido.emit(!this.pedido)
  }

  handleCantidad(operacion:string, comida: {comida: IComida, cantidad: number}) {
    this.storage.actualizarComidasCompradas(comida, operacion)
    console.log(this.storage.comidasCompradas())
  }
}
