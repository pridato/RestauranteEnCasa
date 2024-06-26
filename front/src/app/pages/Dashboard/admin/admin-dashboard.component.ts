import { Component, inject } from "@angular/core";
import { ICliente } from "src/app/core/models/cliente";
import { StorageService } from "src/app/core/servicios/storage.service";
import { MatExpansionModule } from "@angular/material/expansion";
import { AdminDashboardService } from "src/app/core/servicios/admin-dashboard.service";
import { MatIconModule } from "@angular/material/icon";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { provideNativeDateAdapter } from "@angular/material/core";
import { FormsModule } from "@angular/forms";
import { DateFormatPipe } from "src/app/shared/pipes/date-format.pipe";
import { PedidosChartComponent } from "./pedidos-chart/pedidos-chart.component";
import { ToastrService } from "ngx-toastr";
import { FormAddFoodComponent } from "./form-add-food/form-add-food.component";
import { MatListModule } from "@angular/material/list";

@Component({
  selector: "app-admin-dashboard",
  standalone: true,
  imports: [
    MatExpansionModule,
    MatListModule,
    FormAddFoodComponent,
    DateFormatPipe,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    FormsModule,
    PedidosChartComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: "./admin-dashboard.component.html",
  styleUrl: "./admin-dashboard.component.css",
})
export class AdminDashboardComponent {
  storage = inject(StorageService);
  cliente: ICliente = this.storage.cliente();
  usuariosConectados: number = 0;

  // TODO Implementar import de comidas via excel
  constructor(
    private adminSvc: AdminDashboardService,
    private toastr: ToastrService
  ) {
    this.adminSvc.cargarUsuariosConectados().subscribe((usuarios) => {
      this.usuariosConectados = usuarios;
    });
  }

  /**
   * metodo para las importaciones de comida unicamente a través de excels
   * @param event
   */
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.adminSvc.importFood(file).subscribe(
      (res) => {
        this.toastr.success(res.mensaje, "Comidas importadas");
      },
      (err) => {
        // devolvemos el resultado de la operacion como toastr
        this.toastr.error(err.error.mensaje, "Error al importar comidas");
      }
    );
  }
}
