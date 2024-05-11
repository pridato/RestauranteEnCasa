import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusquedaComidasService {

  // behaviour subject de un buscador con get y set

  textoABuscar:BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor() { }

  setTextoABuscar(texto:string) {
    this.textoABuscar.next(texto)
  }

  getTextoABuscar() : Observable<string>{
    return this.textoABuscar.asObservable()
  }
}
