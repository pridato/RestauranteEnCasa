import { IComida } from "./comida"
import { ComidaPedido } from "./ComidaPedido"

export interface Pedido {
  id?:string,
  estado: string,
  usuarioId: string,
  comidas: ComidaPedido[],
  horaPedido?:Date
}