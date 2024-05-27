import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { springUrl } from 'src/app/shared/globales/globales';
import { IRestMessage } from '../models/message';

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

  /**
   * metodo para guardar una comida
   * @param food comida del formulario
   * @returns response entity de RestMessage (si todo ok 201)
   */
  saveFood(food:any):Observable<IRestMessage>{
    return this.http.post<IRestMessage>(`${springUrl}/restaurantes/add-food`,food);
  }
}
