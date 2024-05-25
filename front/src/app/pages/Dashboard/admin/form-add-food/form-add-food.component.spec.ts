import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddFoodComponent } from './form-add-food.component';

describe('FormAddFoodComponent', () => {
  let component: FormAddFoodComponent;
  let fixture: ComponentFixture<FormAddFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddFoodComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAddFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
