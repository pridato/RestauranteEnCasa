import { Component } from '@angular/core';

@Component({
  selector: 'app-panel-cliente',
  standalone: true,
  imports: [],
  templateUrl: './panel-cliente.component.html',
  styleUrl: './panel-cliente.component.css'
})
export class PanelClienteComponent {

  /*
   el principio de panel será igual para todos es decir. Tendrán una opción para modificación de credenciales...

   Después de eso a través del rol que tiene cada uno crearemos una vista en específico. 
   Por ejemplo 
    ADMINISTRADORES:
      1. Importar excel de comida. Es decir importar la carta de su restaurante
      2. Vista de los últimos comentarios en x tiempo a través de un filtro
      3. Gráficas a través de canvas de Usuarios conectados y últimos pedidos en x tiempo  
    CAMAREROS y COCINEROS:

    USUARIOS:
      1. Una acumulación de puntos x pedidos hechos.
  */
}
