import { CommonModule } from "@angular/common";
import { Component, NgZone } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ICliente } from "src/app/core/models/cliente";
import { ICredenciales } from "src/app/core/models/credenciales";
import { RestService } from "src/app/core/servicios/RestService.service";
import { StorageService } from "src/app/core/servicios/storage.service";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  credenciales: ICredenciales = {
    email: "",
    password: "",
  };

  error = "";
  loggedIn!: boolean;

  mostrarPassword: boolean = false;
  // mostrar ocultar display toggle (password - text)
  estiloPassword: string = "password";

  constructor(
    public restService: RestService,
    public storage: StorageService,
    public router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone
  ) {
    this.readQueryParams();
  }

  readQueryParams() {
    this.route.queryParams.subscribe((params) => {
      // leer parametro email y jwt
      let email = params["email"];
      let jwt = params["jwt"];

      if (email && jwt) {
        this.restService.getClientByEmail(email).subscribe((res) => {
          // guardamos el cliente y el jwt
          this.updateStorageAndRedirect(res, jwt);
        });
      }
    });
  }

  /**
   * A través de las credenciales sacamos de spring el objeto entero. Nos interesa de aquí el jwt y el rol del usuario
   * Ambas nos dejarán acceder a páginas determinadas...
   * Para los roles en cada controlador de la página que nos interesa lo comprobamos a mano y listo
   *
   */
  login() {
    this.restService.login(this.credenciales).subscribe(
        (res) => {
          if (res.codigo === 0) {
            // limpiamos errores
            this.error = "";
            this.ngZone.run(() => {
              this.updateStorageAndRedirect(res.datosCliente!, res.token);
            });
          } else {
            throw new Error(res.mensaje);
          }
        },
        (err) => {
          this.error = err.error.mensaje || "Error no controlado";
        }
      )
  }

  /**
   * metodo para actualizar el storage global de la aplicación
   * @param res cliente a guardar
   * @param jwt jwt dentro del imessage
   */
  private updateStorageAndRedirect(res: ICliente, jwt: any) {
    this.storage.guardarCliente(res);
    this.storage.guardarJwt(jwt);
    this.getRedirectByRole(res.rol);
  }

  /**
   * metodo para alternar password y text para mostrar texto
   */
  toggleMostrarPassword() {
    this.mostrarPassword = !this.mostrarPassword;
    if (this.mostrarPassword) this.estiloPassword = "text";
    else this.estiloPassword = "password";
  }

  /**
   * Metodo para loguearse con google
   */
  loginGoogle() {
    // 1º de spring obtenemos la url del redirect de google
    try {
      this.restService.getUrlGoogle().subscribe((res) => {
        window.location.href = res.url;
      });
    } catch (error) { }
  }

  /**
   * metodo para preparar un redirect para la funcion que deberia desempeñar ese usuario en concreto
   * @param rol
   */
  getRedirectByRole(rol: string): void {
    console.log()
    try {
      if (rol == "ADMINISTRADOR")
        this.router.navigateByUrl("Dashboard/administrador");
      else if (rol == "CAMARERO") this.router.navigateByUrl("Dashboard/camarero");
      else if (rol == "COCINERO") this.router.navigateByUrl("Dashboard/cocinero");
      else this.router.navigateByUrl("Restaurante/categories");
    } catch(error) { 
      console.error(error);
    }
   
  }
}
