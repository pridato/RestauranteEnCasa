import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { seguridadComidasGuard } from './seguridad-comidas.guard';

describe('seguridadComidasGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => seguridadComidasGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
