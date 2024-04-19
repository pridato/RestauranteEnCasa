import { ICredenciales } from "./credenciales";

export interface ICliente {
  id?: string;
  nombre: string;
  apellido: string;
  credenciales: ICredenciales
  telefono?: number;
  direccion: string;
  fechaRegistro: Date;
  rol: string;
}