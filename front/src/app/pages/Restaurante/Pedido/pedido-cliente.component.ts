import { Component, ViewChild } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatStepper, MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Pedido } from 'src/app/core/models/pedido';
import { RestService } from 'src/app/core/servicios/RestService.service';
import { PedidoClienteService } from 'src/app/core/servicios/pedido-cliente.service';
import { StorageService } from 'src/app/core/servicios/storage.service';
import { DateFormatHoursPipe } from 'src/app/shared/pipes/date-format-hours.pipe';

@Component({
  selector: 'app-pedido-cliente',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    CommonModule,
    DateFormatHoursPipe
  ],
  templateUrl: './pedido-cliente.component.html',
  styleUrl: './pedido-cliente.component.css'
})
export class PedidoClienteComponent {


  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  mostrarStepper = false;
  selectedStepIndex: number = 0;
  idPedidoSeleccionado!:string

  pedidosUsuario:Pedido[] = []

  constructor(private _formBuilder: FormBuilder, private pedidoSvc:PedidoClienteService, private storage:StorageService) {
    this.cargarPedidos()
    // cada 20 segundos se actualizan los pedidos
    setInterval(() => {
      this.cargarPedidos()
    }, 20000)
  }

  cargarPedidos() {
      this.pedidoSvc.cargarPedidos(this.storage.cliente().id!).subscribe(
      (data) => {
        this.pedidosUsuario = []
        this.pedidosUsuario = data
        console.log(this.pedidosUsuario)
      })
  }

  /**
   * metodo para seleccionar el index del stepper a partir del estado del pedido
   */
  generarStepIndex() {
    console.log(this.idPedidoSeleccionado)
    let pedidoActual:Pedido = this.pedidosUsuario.find(pedido => pedido.id === this.idPedidoSeleccionado)!

    if(pedidoActual.estado === 'En Preparación') {
      this.selectedStepIndex = 1
    } else if(pedidoActual.estado === 'Preparado') {
      this.selectedStepIndex = 2
    } 
  }

  toggleStepper() {
    this.generarStepIndex()
    this.mostrarStepper = true 
  }
}
