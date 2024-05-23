import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ICliente } from 'src/app/core/models/cliente';
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
               private router:Router,
               private route: ActivatedRoute) {

        this.readQueryParams()
  }

  readQueryParams() {
    this.route.queryParams.subscribe(params => {
      // leer parametro email y jwt
      let email = params['email']
      let jwt = params['jwt']
      
      if (email && jwt) {
        this.restService.getClientByEmail(email).subscribe(res => {
          // guardamos el cliente y el jwt
          this.updateStorageAndRedirect(res, jwt);
        })
      }
    })
  }



  private updateStorageAndRedirect(res: ICliente, jwt: any) {
    this.storage.guardarCliente(res);
    this.storage.guardarJwt(jwt);
    this.getRedirectByRole(res.rol)
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
        this.updateStorageAndRedirect(_res.datosCliente!, _res.token)

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

  /**
   * metodo para preparar un redirect para la funcion que deberia desempeñar ese usuario en concreto
   * @param rol 
   */
  getRedirectByRole(rol:string) :void {
    console.log(rol)
    if(rol == 'ADMINISTRADOR') this.router.navigateByUrl('Dashboard/administrador')
    else if(rol == 'CAMARERO') this.router.navigateByUrl('Dashboard/camarero')
    else if(rol == 'COCINERO') this.router.navigateByUrl('Dashboard/cocinero')
    else this.router.navigateByUrl('Restaurante/categories')
  }
}
