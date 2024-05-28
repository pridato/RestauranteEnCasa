import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from 'src/app/core/models/ChatMessage';
import { ICliente } from 'src/app/core/models/cliente';
import { ChatService } from 'src/app/core/servicios/chat.service';
import { StorageService } from 'src/app/core/servicios/storage.service';
import { defaultRoom } from 'src/app/shared/globales/globales';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {

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
    console.log(this.message)
    this.chatSvc.sendMessage(defaultRoom, this.message)
  }

  listenerMessage() {
    this.chatSvc.getMessages().subscribe((messages:ChatMessage[]) => {
      this.messageList = messages
      console.log(this.messageList)
    })
  }
}
