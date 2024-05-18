import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { AdminDashboardService } from 'src/app/core/servicios/admin-dashboard.service';

@Component({
  selector: 'app-pedidos-chart',
  standalone: true,
  imports: [BaseChartDirective], // -> con esto podemos blindear las props. de canvas
  templateUrl: './pedidos-chart.component.html',
  styleUrl: './pedidos-chart.component.css'
})
/**
 * clase que se encarga de mostrar el grafico de pedidos con las tecnologías chart.js y ng2-charts
 * npm install chart.js --save
 */
export class PedidosChartComponent {

  counts: number[] = []
  dates: Date[] = []

  //#region CHART CONFIGURATION
  /**
   * metodo de configuración de la grafica
   */
  public lineChartData: ChartConfiguration<'line'>['data'] = { // -> line canvas type y data el content
    labels: [],
    datasets: [
      {
        label: 'Pedidos',
        data: [],
        fill: false,
        borderColor: '#4bc0c0'
      }
    ]
  }

  /**
   * metodo que se encarga de adaptar al tamaño de la pantalla
   */
  public lineChartOptions: ChartOptions = {
    responsive: true,
  }

  public lineChartLegend = true;
  //#endregion

  constructor(private adminSvc:AdminDashboardService) {
    this.getPedidosDateRange()
  }

  /**
   * TODO input de fechas
   * por el momento vamos a dar las fechas desde hace 1 semana hasta la fecha actual
   */
  getPedidosDateRange() {
    const fechaActual = new Date()
    const fechaInicio = new Date(fechaActual)
    fechaInicio.setDate(fechaInicio.getDate() - 7)
    
    this.adminSvc.cargarPedidosTotalesRango(fechaInicio, fechaActual).subscribe(pedidos => {
      for (const [fecha, total] of Object.entries(pedidos)) {
        this.counts.push(total)
        this.dates.push(new Date(fecha))
      }
      this.updateChartData();
    })
    
  }

  /**
   * metodo que se encarga de cargar el grafico con los pedidos
   */
  updateChartData(): void {
    console.log(this.counts)
    console.log(this.dates)

    this.lineChartData = {
      datasets: [
        {
          data: this.counts,
          label: 'Pedidos',
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)',
        },
      ],
      labels: this.formatearFecha(),
    };

    
  }

  /**
   * metodo que se encarga de formatear la fecha -> dd-mm
   */
  formatearFecha() {
    return this.dates.map(date => {
      const day = date.getDate();
      const month = date.toLocaleString('default', { month: 'short' }); // Obtener el nombre corto del mes
      return `${day}-${month}`;
    });
  }
}
