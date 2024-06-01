import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { springUrl } from 'src/app/shared/globales/globales';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  headers = {
    'Content-Type': 'application/json',
  }

  constructor(private http:HttpClient) { }


  /**
   * metodo para obtener todas las categorias de las comidas registradas
   * @returns observable de un array de categorias, categoria => {_id: '', tipo: ''}
   */
  getCategories() :Observable<any[]>{
    return this.http.get<any[]>(`${springUrl}/restaurantes/get-categories`, {headers: this.headers})
  }
}
