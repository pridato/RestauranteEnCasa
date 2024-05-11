import { IComida } from "./comida";

export interface ComidaPedido {
  comidaId: string,
  cantidad: number,
  nombreComida: string
}