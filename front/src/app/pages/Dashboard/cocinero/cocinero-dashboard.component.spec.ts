import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocineroDashboardComponent } from './cocinero-dashboard.component';

describe('CocineroDashboardComponent', () => {
  let component: CocineroDashboardComponent;
  let fixture: ComponentFixture<CocineroDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CocineroDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CocineroDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
