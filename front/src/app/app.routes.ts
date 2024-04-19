import { Routes } from '@angular/router';
import { seguridadComidasGuard } from './core/guards/seguridad-comidas.guard';

export const routes: Routes = [
  {
    path: 'Cliente',
    loadChildren: () => import('./pages/Cliente/cliente.routes').then(m => m.CLIENTE_ROUTES)
  },
  {
    path: 'Restaurante',
    canActivate: [seguridadComidasGuard],
    loadChildren: () => import('./pages/Restaurante/comida.route').then(m => m.COMIDA_ROUTES)
  },
  {path: 'Dashboard', loadChildren: () => import('./pages/Dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES) },
  // redirigir directamente a registro
  {
    path: '', redirectTo: '/Cliente/Login', pathMatch: 'full'
  },
];
