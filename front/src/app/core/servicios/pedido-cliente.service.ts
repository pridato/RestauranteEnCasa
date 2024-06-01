import { Injectable } from '@angular/core';
import { RestService } from './RestService.service';
import { HttpClient } from '@angular/common/http';
import { springUrl } from 'src/app/shared/globales/globales';
import { Pedido } from '../models/pedido';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoClienteService {

  constructor(private http:HttpClient) { }

  /**
   * metodo para cargar los pedidos del usuario cada x tiempo
   */
  cargarPedidos(id:string) :Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${springUrl}/Pedido/obtener-pedidos-usuario?id=${id}`)
  }
}