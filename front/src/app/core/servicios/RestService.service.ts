import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, afterNextRender } from "@angular/core";
import { IRestMessage } from "../models/message";
import { Observable, lastValueFrom } from "rxjs";
import { ICredenciales } from "../models/credenciales";
import { ICliente } from "../models/cliente";
import { IComida } from "../models/comida";
import { springUrl } from "src/app/shared/globales/globales";
import { Pedido } from "../models/pedido";

@Injectable({
  providedIn: "root",
})
export class RestService {
  constructor(private _httpClient: HttpClient) {}

  //#region  ZONA CLIENTE

  insertCliente(cliente: ICliente): Promise<IRestMessage> {
    console.log(springUrl + "/Cliente/add");
    return lastValueFrom(
      this._httpClient.post<IRestMessage>(springUrl + "/Cliente/add", cliente, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
    );
  }

  login(credenciales: ICredenciales): Promise<IRestMessage> {
    // by get method
    return lastValueFrom(
      this._httpClient.get<IRestMessage>(
        springUrl +
          `/Cliente/login?email=${credenciales.email}&password=${credenciales.password}`
      )
    );
  }

  obtenerClienteId(id:string): Observable<ICliente> {
    return this._httpClient.get<ICliente>(`${springUrl}/Cliente/obtener-cliente-id?id=${id}`)
  }
  

  //#endregion

  //#region ZONA RESTAURANTE

  public obtenerComidas(): Observable<IComida[]> {
    console.log("llamada");
    return this._httpClient.get<IComida[]>(springUrl + "/restaurantes/comidas");
  }

  public obtenerComida(id: string): Observable<IComida> {
    return this._httpClient.get<IComida>(
      springUrl + `/restaurantes/comidas/${id}`
    );
  }

  

  //#region ZONA PEDIDOS

  public realizarPedido(pedido: Pedido): Promise<IRestMessage> {
    console.log(springUrl + "/Pedido/addPedido")
    return lastValueFrom(
      this._httpClient.post<IRestMessage>(
        springUrl + "/Pedido/add",
        pedido,
        {
          headers: new HttpHeaders({
            "Content-Type": "application/json",
          }),
        }
      )
    );
  }

  /**
   * tendríamos que hacer una petición a pedidos cada muy poco tiempo e irlos insertando en un array general
   * ordenado de más antiguos a nuevos. Podríamos usar toast para avisar al cocinero y una pequeña animación
   */
  public getPedidos(): Observable<Pedido[]> {
    return this._httpClient.get<Pedido[]>(`${springUrl}/Pedido/obtener-pedidos`)
  }
  //#endregion
  //#endregion
}
