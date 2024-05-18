import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

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
export class PedidosChartComponent implements OnChanges {

  @Input() pedidos: { date: Date, count: number }[] = [];

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

  constructor() {
    this.updateChartData()
  }

  ngOnChanges(): void {
    this.updateChartData()
  }

  /**
   * metodo que se encarga de cargar el grafico con los pedidos
   */
  updateChartData(): void {
    const dates = this.pedidos.map(pedido => pedido.date);
    const counts = this.pedidos.map(pedido => pedido.count);

    this.lineChartData = {
      datasets: [
        {
          data: counts,
          label: 'Pedidos',
          borderColor: 'black',
          backgroundColor: 'rgba(255,0,0,0.3)',
        },
      ],
      labels: dates,
    };
  }

}
