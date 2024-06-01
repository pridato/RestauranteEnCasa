import { CanActivateFn } from '@angular/router';
import { StorageService } from '../servicios/storage.service';
import { inject } from '@angular/core';

export const seguridadComidasGuard: CanActivateFn = (route, state) => {

  let storage = inject(StorageService)

  return storage.cliente().id ? true : false;
};
