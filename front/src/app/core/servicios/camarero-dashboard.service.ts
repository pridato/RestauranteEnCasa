import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { springUrl } from 'src/app/shared/globales/globales';
import { Pedido } from '../models/pedido';
import { IRestMessage } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class CamareroDashboardService {

  constructor(private http:HttpClient) { }

  /**
   * metodo para cargar los pedidos del usuario cada x tiempo
   */
  cargarPedidos() :Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${springUrl}/Pedido/obtener-pedidos-hechos`)
  }

  actualizarPedido(pedido:Pedido) :Observable<IRestMessage>{
    // lo enviamos a añadir y al tener ya el id spring lo actualiza en vez de añadir
    return this.http.post<IRestMessage>(`${springUrl}/Pedido/add`, pedido)
  }
}
