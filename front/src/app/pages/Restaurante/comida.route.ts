import { Routes } from "@angular/router";
import { ComidasComponent } from "./Comidas/comidas.component";
import { DetallecomidaComponent } from "./Comidas/DetalleComida/detallecomida.component";
import { ReservasComponent } from "./Reservas/reservas.component";
import { ComidascompradasComponent } from "./Comidas/ComidasCompradas/comidascompradas.component";


export const COMIDA_ROUTES: Routes = [
    { path: 'Comidas', component: ComidasComponent},
    {path: 'Reservas', component: ReservasComponent},
    {path: 'Detalle/:id', component: DetallecomidaComponent},
    {path: 'Pedido', component: ComidascompradasComponent}
]