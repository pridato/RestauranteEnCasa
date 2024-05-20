import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ICredenciales } from 'src/app/core/models/credenciales';
import { RestService } from 'src/app/core/servicios/RestService.service';
import { StorageService } from 'src/app/core/servicios/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  credenciales:ICredenciales = {
    email: '',
    password: ''
  }

  error = false
  loggedIn!: boolean;

  mostrarPassword:boolean = false
  // mostrar ocultar display toggle (password - text)
  estiloPassword:string = 'password'
  
  constructor (private restService:RestService, 
               private storage:StorageService, 
               private router:Router
              ) {

  }

  /**
   * A través de las credenciales sacamos de spring el objeto entero. Nos interesa de aquí el jwt y el rol del usuario
   * Ambas nos dejarán acceder a páginas determinadas...
   * Para los roles en cada controlador de la página que nos interesa lo comprobamos a mano y listo
   *
   * @memberof LoginComponent
   */
  async login() {
    try {
      const _res = await this.restService.login(this.credenciales)
      // obtenemos el rest message con todo 
      if (_res.codigo == 0){
        // si la respuesta de spring ha sido positiva guardamos tanto el cliente como el jwt
        this.storage.guardarCliente(_res.datosCliente!)
        this.storage.guardarJwt(_res.token!)
        this.router.navigateByUrl('/Restaurante/Comidas')

      } else {
       throw new Error('Error en el login')
      }
    } catch (error) {
      this.error = true
    }
    
  }

  /**
   * metodo para alternar password y text para mostrar texto
   */
  toggleMostrarPassword() {
    this.mostrarPassword = !this.mostrarPassword
    if(this.mostrarPassword) this.estiloPassword = 'text'
    else this.estiloPassword = 'password'
  }

  /**
   * Metodo para loguearse con google
   */
  loginGoogle() {
    // 1º de spring obtenemos la url del redirect de google
    try {
      this.restService.getUrlGoogle().subscribe(res => {
        window.location.href = res.url
      })
    } catch (error) {
      console.log(error)
    }
  }
}
