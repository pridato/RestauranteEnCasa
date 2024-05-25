import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { springUrl } from 'src/app/shared/globales/globales';

@Injectable({
  providedIn: 'root'
})
export class FormAddFoodService {

  constructor(private http:HttpClient) { }

/**
 * metodo para devolver el enum de tipoComida 
 * @returns 
 */
  getFoodTypes() :Observable<string[]>{
    return this.http.get<string[]>(`${springUrl}/restaurantes/get-categories-enum`);
  }
}
