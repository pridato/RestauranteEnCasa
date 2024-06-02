import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';
import { springUrl } from 'src/app/shared/globales/globales';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  constructor(private http:HttpClient) { }

  public cargarUsuariosConectados() :Observable<number>{
    return this.http.get<number>(`${springUrl}/Sesiones/count`)
  }

  public cargarPedidosEntrantes(date:Date) :Observable<Pedido[]> {  
    return this.http.get<Pedido[]>(`${springUrl}/Pedido/obtener-pedidos-fecha?fecha=${date}`)
  }

  public cargarPedidosTotalesRango(dateInicio:Date, dateFin:Date) :Observable<Map<Date, number>> {
    return this.http.get<Map<Date, number>>(`${springUrl}/Pedido/obtener-pedidos-rango-fechas?fechaInicio=${dateInicio}&fechaFin=${dateFin}`)
  }

  /**
   * metodo para importar comida a través de un archivo excel => admin-dashboard
   * @param file  el archivo a importar
   * @returns  response entity con el resultado de la importación
   */
  importFood(file:File) :Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${springUrl}/restaurantes/import-food`, formData)
  }
}
