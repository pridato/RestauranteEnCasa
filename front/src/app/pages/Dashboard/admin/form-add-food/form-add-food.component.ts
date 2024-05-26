import { Component } from "@angular/core";
import { MatStepperModule } from "@angular/material/stepper";
import { FormAddFoodService } from "src/app/core/servicios/form-add-food.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { IComida } from "src/app/core/models/comida";
import { COMMA, ENTER } from "@angular/cdk/keycodes";

import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from "@angular/material/chips";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-form-add-food",
  standalone: true,
  imports: [
    MatStepperModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: "./form-add-food.component.html",
  styleUrl: "./form-add-food.component.css",
})
export class FormAddFoodComponent {
  // variable para añadir accesibilidad con el teclado
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  foodTypes: string[] = [];

  comida: IComida = {
    nombre: "",
    ingredientes: [],
    precio: 0,
    especificacion: "",
    tipo: "",
    informacionAdicional: {
      calorias: 0,
      proteinas: 0,
      grasas: 0,
      carbohidratos: 0,
    },
    tiempoPreparacion: new Date(),
    imagenBASE64: "",
  };

  selectedImage: string | ArrayBuffer | null = null;

  constructor(private formAddFoodService: FormAddFoodService) {
    this.getFoodTypes();
  }

  /**
   * metodo para guardar la comida registrada
   */
  saveFood() {
    console.log(this.comida);
  }

  /**
   * metodo para añadir la imagen de un plato
   * @param event evento del input
   */
  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      this.selectedImage = e.target?.result as string;
    };

    reader.readAsDataURL(file);
  }

  /**
   * metodo para abrir el explorador de archivos 
   */
  openFileInput() {
    document.getElementById('dropzone-file')?.click();
  }

  /**
   * Metodo para obtener los tipos de comida
   */
  getFoodTypes() {
    this.formAddFoodService.getFoodTypes().subscribe(
      (data) => {
        this.foodTypes = data;
      },
      (error) => {
        console.error("Error al obtener los tipos de comida: ", error);
      }
    );
  }

  /**
   * metodo para filtrar los tipos de comida x los escritos por user
   * @param value el input mismo pasado para sacar el nuevo buscador 
   * @returns null
   */
  filterFoods(value:any) {
    // antes de cada filtro reseteamos los tipos de comida para al ir borrando salgan más 
    // lo llamamos aqui en vez de en el servicio para evitar problemas de async, sino podríamos crear otro obs. general para ambos y listo
    this.formAddFoodService.getFoodTypes().subscribe(
      (data) => {
        this.foodTypes = data;
        const filterValue = value.target.value.toLowerCase();
        this.foodTypes = this.foodTypes.filter((food) =>
          food.toLowerCase().includes(filterValue)
        );
      })
   
  }



  //#region  METODOS PARA LOS CHIPS DE INGREDIENTES

  /**
   * metodo para crear un nuevo ingrediente
   * @param event evento de escribir en el input (el nuevo ingrediente)
   */
  addIngredient(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    if (value) {
      this.comida.ingredientes.push(value);
    }

    event.chipInput!.clear();
  }

  /**
   * metodo para eliminar un ingrediente
   * @param ingredient  string al darle click
   */
  removeIngredient(ingredient: string): void {
    const index = this.comida.ingredientes.indexOf(ingredient);

    if (index >= 0) {
      this.comida.ingredientes.splice(index, 1);
    }
  }

  /**
   * metodo para modificar un ingrediente ya guardado
   * @param ingredient  string escrito con anterioridad
   * @param event el nuevo string a mandar
   * @returns null
   */
  editIngredient(ingredient: string, event: MatChipEditedEvent): void {
    const value = event.value.trim();

    // si se manda vacío se manda a eliminar
    if (!value) {
      this.removeIngredient(ingredient);
      return;
    }

    // se manda editar el ingrediente
    const index = this.comida.ingredientes.indexOf(ingredient);
    if (index >= 0) {
      this.comida.ingredientes[index] = value;
    }
  }

  //#endregion
}
