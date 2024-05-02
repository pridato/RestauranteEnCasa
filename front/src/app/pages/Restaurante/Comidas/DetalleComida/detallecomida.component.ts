import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IComida } from 'src/app/core/models/comida';
import { RestService } from 'src/app/core/servicios/RestService.service';
import { StorageService } from 'src/app/core/servicios/storage.service';

@Component({
  selector: 'app-detallecomida',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './detallecomida.component.html',
  styleUrl: './detallecomida.component.css'
})
export class DetallecomidaComponent {

  @Input('id') id!:string;

  private toastr = inject(ToastrService)
  private rest = inject(RestService)
  public storage = inject(StorageService)

  comida!:IComida
  elementoComida!:{comida:IComida, cantidad:number}
  
  constructor() {
  }

  ngOnInit(){
    this.rest.obtenerComida(this.id).subscribe((comida: IComida) => {
      this.comida = comida
      this.elementoComida = {comida: this.comida, cantidad : 1}
    });
  }

  showPedido: boolean = false; // mostrar o no dialog para seleccionar mesa
  tableSelected!: number; // mesa seleccionada

  comprar(){

    // si se ha guardado la mesa guaramos la compra sino mostramos la mesa
    if(this.tableSelected > 0) {
      // guardamos la mesa
      this.storage.cliente().mesa = this.tableSelected
      this.toastr.success(`Comida guardada ${this.elementoComida.comida.nombre}`, 'Item añadido a gustado')
      this.storage.guardarComidasCompradas(this.elementoComida)
      
    } 

    this.showPedido = !this.showPedido
    
  }
}
