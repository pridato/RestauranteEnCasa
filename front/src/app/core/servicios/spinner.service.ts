import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Servicio que muestra un spinner cuando se realiza una request
 */
export class SpinnerService {

  // crear un observable para mostrar el spinner con beahviorSubject y dos mostrar hide

  spinner$ = new BehaviorSubject<boolean>(false);
  constructor() { }

  showSpinner() {
    this.spinner$.next(true);
  }

  hideSpinner() {
    this.spinner$.next(false);
  }
}
