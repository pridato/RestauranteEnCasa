import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, afterNextRender } from '@angular/core';
import { IRestMessage } from '../models/message';
import { Observable, lastValueFrom } from 'rxjs';
import { ICredenciales } from '../models/credenciales';
import { ICliente } from '../models/cliente';
import { IComida } from '../models/comida';
import { springUrl } from 'src/app/shared/globales/globales';

@Injectable({
  providedIn: 'root',
})
export class RestService {


  constructor(private _httpClient:HttpClient) { 
    afterNextRender(() => {
      localStorage.setItem('cliente', 'clienteprueba')
    })

    
  }

  //#region  ZONA CLIENTE

  insertCliente(cliente:ICliente): Promise<IRestMessage> {
    
    console.log(springUrl+'/Cliente/add')
    return lastValueFrom(
      this._httpClient.post<IRestMessage>(
        springUrl+'/Cliente/add',
        cliente,
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        }
      )
    )
  }

  login(credenciales:ICredenciales): Promise<IRestMessage> {
    // by get method
    return lastValueFrom(
      this._httpClient.get<IRestMessage>(
        springUrl+`/Cliente/login?email=${credenciales.email}&password=${credenciales.password}`
      )
    )
  }

  //#endregion

  //#region ZONA RESTAURANTE

  public obtenerComidas(): Observable<IComida[]> {
    return (
      this._httpClient.get<IComida[]>(
        springUrl+'/restaurantes/comidas'
      )
    )
  }

  public obtenerComida(id: string): Observable<IComida> {
    return this._httpClient.get<IComida>(springUrl + `/restaurantes/comidas/${id}`);
  }
  

  //#endregion

  //#region ZONA CHEFS


  //#endregion
}
