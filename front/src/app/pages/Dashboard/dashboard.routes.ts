import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./admin/admin-dashboard.component";
import { CamareroDashboardComponent } from "./camarero/camarero-dashboard.component";
import { CocineroDashboardComponent } from "./cocinero/cocinero-dashboard.component";

export const DASHBOARD_ROUTES:Routes = [
  {path: 'administrador', component: AdminDashboardComponent},
  {path: 'camarero', component: CamareroDashboardComponent},
  {path: 'cocinero', component: CocineroDashboardComponent},
]