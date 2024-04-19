import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  next(req).pipe(catchError(handleError))

  function handleError(error: HttpErrorResponse) {
    const errorResponse = `Error ${error.status}, message: ${error.message}`
    console.log(error)
    return throwError(()=> 'Error!')
  }

  return next(req);
};


