import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from 'src/app/core/models/ChatMessage';
import { ICliente } from 'src/app/core/models/cliente';
import { ChatService } from 'src/app/core/servicios/chat.service';
import { StorageService } from 'src/app/core/servicios/storage.service';
import { UsuarioImagen } from 'src/app/shared/enums/UsuarioImagen';
import { defaultRoom } from 'src/app/shared/globales/globales';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

  @Output() closeChat = new EventEmitter<boolean>()

  messageList:ChatMessage[] = []
  user!:ICliente
  message:ChatMessage = {
    message: '',
    user: this.user
  }

  constructor(private chatSvc:ChatService, private storageSvc:StorageService) { 
    this.message.user = this.storageSvc.cliente()
    this.user = this.storageSvc.cliente()
    this.chatSvc.joinRoom(defaultRoom);
    this.listenerMessage()
  }

  /**
   * metodo para el envio de mensajes a una sala. 
   * el message -> cliente es el logueado de la sesion
   */
  sendMessage(){
    this.chatSvc.sendMessage(defaultRoom, this.message)
    this.message.message = ''
  }

  listenerMessage() {
    this.chatSvc.getMessages().subscribe((messages:ChatMessage[]) => {
      this.messageList = messages
    })
  }

  /**
   * metodo para cerrar el chat -> output a padre app.comp
   */
  toggleChatState() {
    this.closeChat.emit(false)
  }

  /**
   * metodo para generar la imagen a partir del rol con el enum UsuarioImagen
   * @param rol string del rol del usuario del mensaje en cuestion
   * @return string con la ruta de la imagen del usuario
   */
  getUserImage(rol:string) :string{
    console.log(rol)
    switch (rol) {
      case 'ADMINISTRADOR':
        return UsuarioImagen.ADMIN;
      case 'CAMARERO':
        return UsuarioImagen.CAMARERO;
      case 'COCINERO':
        return UsuarioImagen.COCINERO;
      default:
        return UsuarioImagen.USUARIO;
    }
  }
}
