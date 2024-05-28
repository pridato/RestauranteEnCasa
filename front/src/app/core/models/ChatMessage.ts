import { ICliente } from "./cliente";

export interface ChatMessage {
  message: string;
  user: ICliente
}