import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../servicios/storage.service';


export const añadirJwtInterceptor: HttpInterceptorFn = (req, next) => {

  let storage = inject(StorageService)

  const jwt = storage.recuperarJwt()

    if(jwt) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${jwt}`
        }
      })
    }
  
  return next(req);
};
