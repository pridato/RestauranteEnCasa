import { Component } from '@angular/core';
import { CategoriesService } from 'src/app/core/servicios/categories.service';
import { TipoComidaImagen, TipoComidaKeys } from 'src/app/shared/enums/TipoComidaImagen';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
/**
 * clase para tener una vista de todas las categorias y seleccionar llevando direc. al filtro d estas 
 */
export class CategoriesComponent {

  categories: string[] = [];
  TipoComidaImagen = TipoComidaImagen

  constructor(private categoriesSvc:CategoriesService) {
    this.getCategories()
  }

  /**
   * metodo para obtener todas las categorias de las comidas registradas
   */
  getCategories() {
    this.categoriesSvc.getCategories().subscribe(res => {
      this.categories = res
    })
  }

  /**
   * metodo para devolver la url de la imagen a través del enum tipo comida
   * @param category string de la categoria iterada
   * @returns string de la url de la imagen de la categoria
   */
  getCategoryImageUrl(category: string): string {
    console.log('category', category);

    if (category.toUpperCase() in TipoComidaImagen) {
      const categoria: TipoComidaKeys = category.toUpperCase() as TipoComidaKeys;
      return TipoComidaImagen[categoria];
    } else {
      return 'url_por_defecto_para_categorias_desconocidas.jpg';
    }
  }
}
