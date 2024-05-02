import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { delay, finalize } from "rxjs";
import { springUrl } from "src/app/shared/globales/globales";
import { SpinnerService } from "../servicios/spinner.service";

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {

  let spinnerSvc = inject(SpinnerService)

  const url = req.url

  // cuando hagamos carga de datos o al actualizar 
  if (url.startsWith(`${springUrl}/restaurantes`)) {
    // establecemos un tiempo mínimo que esté para evitar que en las peticiones que duran nada se vea raro
    spinnerSvc.show()
    spinnerSvc.isLoading$.subscribe(data => console.log(data))
    return next(req).pipe(
      finalize(() => {
        spinnerSvc.hide()
      }
      )
    );
  }
  
  return next(req)
};

