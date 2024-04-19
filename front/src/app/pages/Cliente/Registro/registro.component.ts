import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ICliente } from 'src/app/core/models/cliente';
import { RestService } from 'src/app/core/servicios/RestService.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports : [
    ReactiveFormsModule, FormsModule, RouterLink
  ],
  providers: [RestService],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  cliente:ICliente ={
    nombre: '',
    apellido: '',
    credenciales: {
      email: '',
      password: ''
    },
    direccion: '',
    fechaRegistro: new Date(),
    rol: ''
  }
  
  constructor( private restService:RestService) {}

  registrarUsuario() {

    console.log(this.cliente)
    this.restService.insertCliente(this.cliente).then(
      (data) => {
        console.log(data)
      }
    )

  }
}
