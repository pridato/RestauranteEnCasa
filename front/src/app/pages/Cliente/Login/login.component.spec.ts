import { ComponentFixture, TestBed } from "@angular/core/testing";
import { LoginComponent } from "./login.component";
import { of, throwError } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IRestMessage } from "src/app/core/models/message";

/**
 * Usamos un mock para imitar la clase rest service, (los metodos usados) aislando así login del resto de comps.
 */
class MockRestService {
  login(credenciales: any) {
    return of({
      codigo: 0,
      mensaje: "Login exitoso",
      datosCliente: { id: 1, rol: "ADMINISTRADOR", nombre: "Cliente Mock" },
      token: "fake-jwt-token",
    });
  }

  getClientByEmail(email: string) {
    return of({ id: 1, rol: "ADMINISTRADOR" });
  }

  getUrlGoogle() {
    return of({ url: "https://fake-url.com" });
  }
}

class MockStorageService {
  guardarCliente(cliente: any) {}
  guardarJwt(jwt: any) {}
}

class MockToastrService {
  error(message: string, title: string) {}
}

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRestService: MockRestService;
  let mockStorageService: MockStorageService;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // inicializamos los mocks
    mockRestService = new MockRestService();
    mockStorageService = new MockStorageService();
    mockRouter = jasmine.createSpyObj("Router", ["navigate"]);

    // importante, nosotros desde el login de google redirigimos al login con params en la url
    const mockActivatedRoute = {
      queryParams: of({ email: "test@example.com", jwt: "fake-jwt-token" }),
    };

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, LoginComponent],
      providers: [
        { provide: mockRestService, useClass: MockRestService },
        { provide: mockStorageService, useClass: MockStorageService },
        { provide: mockRouter, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: mockRestService, useClass: MockToastrService },
        { provide: ToastrService, useClass: MockToastrService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  /**
   * test para el action de mostrar-ocultar contraseña, si está oculta la muestra y viceversa
   */
  it("should toggle mostrar password", () => {
    component.mostrarPassword = false;
    component.toggleMostrarPassword();
    expect(component.mostrarPassword).toBeTrue();
    expect(component.estiloPassword).toBe("text");

    component.toggleMostrarPassword();
    expect(component.mostrarPassword).toBeFalse();
    expect(component.estiloPassword).toBe("password");
  });

  /**
   * test para el action de leer query params, si hay email y jwt en la url, se llama a la función de restService, se comprueba que admin redirige bien
   */
  it("should handle login correctly",  () => {

    component.credenciales = {email: 'test@example.com', 'password': '123456'}
    component.login()
    fixture.detectChanges()
    expect(component.error).toBe('')
  })

  it("should redirect to admin dashboard after successful login as admin", () => {
  
    component.credenciales = { email: 'test@example.com', password: '123456' }

    const loginResponse = {
      codigo: 0,
      mensaje: "Login exitoso",
      datosCliente: { id: 'aa', rol: "ADMINISTRADOR", nombre: "Admin User", apellido: "Admin", credenciales: component.credenciales, direccion: "123 Main St", fechaRegistro: new Date() },
      token: "fake-jwt-token",
    };

    spyOn(component.restService, 'login').and.returnValue(of(loginResponse));
    spyOn(component.storage, 'guardarCliente');
    spyOn(component.storage, 'guardarJwt');
    spyOn(component.router, 'navigateByUrl')

    component.login();
    fixture.detectChanges();
  
    expect(component.storage.guardarCliente).toHaveBeenCalledWith(loginResponse.datosCliente);
    expect(component.storage.guardarJwt).toHaveBeenCalledWith(loginResponse.token);
    expect(component.router.navigateByUrl).toHaveBeenCalledWith('Dashboard/administrador');
  });
  

  /**
   * test para controlar los errores de login, asegurarnos que los errores que genera la funcion se leen en el html
   */
  it("should handle login error", async () => {
    const errorMessage = 'Error al iniciar sesión';

    component.credenciales = {email: 'test@example.com', 'password': '123456'}
    spyOn(component.restService, 'login').and.returnValue(throwError({ error: { mensaje: errorMessage } }));
    component.login()
    fixture.detectChanges()
    expect(component.error).toBe(errorMessage)
    }
  )
});
