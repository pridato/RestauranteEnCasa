import { ICliente } from "./cliente";

export interface ChatMessage {
  message: string;
  user: ICliente
  fecha_envio?: Date
}