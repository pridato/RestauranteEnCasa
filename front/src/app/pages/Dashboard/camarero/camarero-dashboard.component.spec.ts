import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CamareroDashboardComponent } from './camarero-dashboard.component';

describe('CamareroDashboardComponent', () => {
  let component: CamareroDashboardComponent;
  let fixture: ComponentFixture<CamareroDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CamareroDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CamareroDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
