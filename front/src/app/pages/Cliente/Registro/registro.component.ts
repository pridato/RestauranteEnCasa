import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ICliente } from 'src/app/core/models/cliente';
import { RestService } from 'src/app/core/servicios/RestService.service';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { UserTypes } from 'src/app/shared/enums/UsersTypes';
import { Usuario } from 'src/app/core/models/usuario';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports : [
    ReactiveFormsModule, FormsModule, RouterLink, MatSelectModule, MatFormFieldModule, CommonModule, MatProgressSpinnerModule
  ],
  providers: [RestService],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  selectFormControl = new FormControl('', Validators.required);
  userTypes = Object.values(UserTypes);

  cliente:Usuario ={
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    telefono: 0,
    emailVerificado: false,
    fechaRegistro: new Date(),
    rol: UserTypes.USUARIO,
  }

  errorForm:string = ''
  showSpinner:boolean = false
  
  constructor( private restService:RestService, private _snackBar: MatSnackBar) {}

  registrarUsuario() {
    this.showSpinner = true
    this.restService.insertCliente(this.cliente).then(
      
      (data) => {
        this.showSpinner = false
        this.openSnackBar()
      }, 
      error => {
        this.showSpinner = false
        this.errorForm = error.error.error
      }
    )

  }

  /**
   * metodo para mostrar un mensaje emergente
   */
  openSnackBar() {
    this._snackBar.open('Revisa tu correo personal para verificar la cuenta.', 'Cerrar', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }
}
