import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio que muestra un spinner cuando se realiza una request
 */
export class SpinnerService {
  isLoading$ = new BehaviorSubject<boolean>(false)
  constructor() { }

  hide(): void {
    this.isLoading$.next(false)
  }

  show(): void {
    this.isLoading$.next(true)
  }
}
