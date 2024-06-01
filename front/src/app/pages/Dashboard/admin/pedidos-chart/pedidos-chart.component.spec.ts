import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosChartComponent } from './pedidos-chart.component';

describe('PedidosChartComponent', () => {
  let component: PedidosChartComponent;
  let fixture: ComponentFixture<PedidosChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedidosChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PedidosChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
