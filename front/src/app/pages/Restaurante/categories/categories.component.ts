import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/core/servicios/categories.service';
import { TipoComidaImagen, TipoComidaKeys } from 'src/app/shared/enums/TipoComidaImagen';
import {  categoriaEspecial } from 'src/app/shared/globales/globales';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
/**
 * clase para tener una vista de todas las categorias y seleccionar llevando direc. al filtro d estas 
 */
export class CategoriesComponent {

  categories: string[] = [];

  // variable para guardar la categoria seleccionada
  hoveredCategory: string | null = ''

  constructor(private categoriesSvc:CategoriesService) {
    this.getCategories()
  }

  /**
   * metodo para obtener todas las categorias de las comidas registradas
   */
  getCategories() {
    this.categoriesSvc.getCategories().subscribe(res => {
      this.categories = res
      this.addLocalCategories()
    })
  }

  /**
   * metodo para devolver la url de la imagen a través del enum tipo comida
   * @param category string de la categoria iterada
   * @returns string de la url de la imagen de la categoria
   */
  getCategoryImageUrl(category: string): string {
    if (category.toUpperCase() in TipoComidaImagen) {
      const categoria: TipoComidaKeys = category.toUpperCase() as TipoComidaKeys;
      return TipoComidaImagen[categoria];
    } else {
      // si no hay x defec. buscar esta imagen, pendiente sacarla de globales 
      return 'assets/images/plato.png';
    }
  }

  /**
   * metodo para añadir las categorias guardadas en globales
   */
  addLocalCategories() {
    this.categories.push(categoriaEspecial)
  }
}
