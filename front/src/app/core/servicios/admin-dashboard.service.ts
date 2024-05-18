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
    console.log(date)
    return this.http.get<Pedido[]>(`${springUrl}/Pedido/obtener-pedidos-fecha?fecha=${date}`)
  }

  public cargarPedidosTotalesRango(dateInicio:Date, dateFin:Date) :Observable<Map<Date, number>> {
    return this.http.get<Map<Date, number>>(`${springUrl}/Pedido/obtener-pedidos-rango-fechas?fechaInicio=${dateInicio}&fechaFin=${dateFin}`)
  }
}
