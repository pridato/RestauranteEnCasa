import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '../servicios/spinner.service';

/**
 * metodo que muestra un spinner cuando se realiza una request
 * @param req 
 * @param next 
 * @returns 
 */
export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {

  let spinnerService = inject(SpinnerService);
  // si la request incluye "restaurantes" se muestra el spinner
  if(req.url.includes('restaurantes')) {
    spinnerService.showSpinner();

    // una vez que la request se completa, se oculta el spinner
    next(req).subscribe({
      complete: () => spinnerService.hideSpinner()
    });
  }

  return next(req);
};
