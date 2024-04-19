import { Injectable, signal } from '@angular/core';
import { ICliente } from '../models/cliente';
import { IComida } from '../models/comida';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  //#region VARIABLES GLOBALES APLICACIÓN
  public cliente = signal<ICliente>(
    {
      id: '',
      apellido: '',
      credenciales: {
        email: '',
        password: '',
      },
      nombre: '',
      direccion: '',
      fechaRegistro: new Date(),
      telefono: 0,
      rol: ''
    }
  )

  // esta señal vamos a guardar dentro el jwt para enviarlo a través de un interceptor en cada pet. a spring
  public jwt = signal<string>('')

  public comidas = signal<IComida[]>([])
  public comidasCompradas = signal<{comida:IComida, cantidad:number}[]>([])
  //#endregion

  //#region METODOS DE ALMACENAMIENTO

  guardarJwt(jwt:string) {
    this.jwt.set(jwt)
  }

  recuperarJwt() :string {
    return this.jwt()
  }

  guardarComidasCompradas(comida:{comida:IComida, cantidad:number}) {
    // 1º comprobar si ese elemento ya está en comidas, si es así aumentar cantidad
    let _index = this.comidasCompradas().findIndex((elemento) => elemento.comida.id === comida.comida.id)
    if(_index !== -1) {
      this.comidasCompradas.update((comidas) => {
        comidas[_index].cantidad += 1
        return comidas
      })
    }else {
      this.comidasCompradas.update((comidas) => [...comidas, comida])
    }
  }

  actualizarComidasCompradas(comida:{comida:IComida, cantidad:number}, operacion:string) {

    if(operacion === 'eliminar') {
      let _index = this.comidasCompradas().findIndex((elemento) => elemento.comida.id === comida.comida.id)
      if(_index !== -1) {
        this.comidasCompradas.update((comidas) => {
          comidas.splice(_index, 1)
          return comidas
        })
      }
      return
    }

    comida.cantidad = operacion === 'restar' && comida.cantidad > 1 ? comida.cantidad - 1 : comida.cantidad + 1
    let _index = this.comidasCompradas().findIndex((elemento) => elemento.comida.id === comida.comida.id)
    if(_index !== -1) {
      this.comidasCompradas.update((comidas) => {
        comidas[_index].cantidad = comida.cantidad
        return comidas
      })
    }

  }


  recuperarComidasCompradas():{comida:IComida, cantidad:number}[] {
    return this.comidasCompradas()
  }

  guardarCliente(cliente:ICliente) {
    this.cliente.update(() => cliente)
  }

  recuperarCliente():ICliente {
    return this.cliente()
  }

  guardarComidas(comida:IComida[]) {
    this.comidas.update(() => comida)
  }

  recuperarComidas():IComida[] {
    return this.comidas()
  }

  //#endregion
}
