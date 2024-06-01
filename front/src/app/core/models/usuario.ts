import { UserTypes } from "src/app/shared/enums/UsersTypes";

export interface Usuario {
  id?: string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    telefono: number;
    fechaRegistro: Date;
    rol: UserTypes;
    emailVerificado: boolean;
    mesa?: number;
}