import { Routes } from "@angular/router";
import { RegistroComponent } from "./Registro/registro.component";
import { LoginComponent } from "./Login/login.component";
import { PanelClienteComponent } from "./panelCliente/panel-cliente.component";
import { seguridadComidasGuard } from "src/app/core/guards/seguridad-comidas.guard";


export const CLIENTE_ROUTES: Routes = [
  {
    path: 'Registro',
    component: RegistroComponent
  },
  {
    path: 'Login',
    component: LoginComponent
  },
  {path: 'PanelCliente', component: PanelClienteComponent, canActivate: [seguridadComidasGuard]}
]