import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IComida } from 'src/app/core/models/comida';
import { RestService } from 'src/app/core/servicios/RestService.service';
import { StorageService } from 'src/app/core/servicios/storage.service';

@Component({
  selector: 'app-detallecomida',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detallecomida.component.html',
  styleUrl: './detallecomida.component.css'
})
export class DetallecomidaComponent {

  @Input('id') id!:string;

  private toastr = inject(ToastrService)
  private rest = inject(RestService)
  private storage = inject(StorageService)

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

  comprar(){
    this.storage.guardarComidasCompradas(this.elementoComida)
    this.toastr.success(`Su ${this.elementoComida.comida.nombre} ya está en proceso`, `Item Agregado `, {
      timeOut: 1500,
    })
    console.log(this.storage.recuperarComidasCompradas())
  }
}
