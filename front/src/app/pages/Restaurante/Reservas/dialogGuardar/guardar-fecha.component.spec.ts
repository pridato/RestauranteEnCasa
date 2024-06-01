import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuardarFechaComponent } from './guardar-fecha.component';

describe('GuardarFechaComponent', () => {
  let component: GuardarFechaComponent;
  let fixture: ComponentFixture<GuardarFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuardarFechaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuardarFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
