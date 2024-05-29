import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NavigationStart, Router } from "@angular/router";
import { ChatMessage } from "src/app/core/models/ChatMessage";
import { ICliente } from "src/app/core/models/cliente";
import { ChatService } from "src/app/core/servicios/chat.service";
import { StorageService } from "src/app/core/servicios/storage.service";
import { UsuarioImagen } from "src/app/shared/enums/UsuarioImagen";
import { defaultRoom } from "src/app/shared/globales/globales";

@Component({
  selector: "app-chat",
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: "./chat.component.html",
  styleUrl: "./chat.component.css",
})
export class ChatComponent {
  @Output() closeChat = new EventEmitter<boolean>();

  messageList: ChatMessage[] = [];
  user!: ICliente;
  message: ChatMessage = {
    message: "",
    user: this.user,
  };

  constructor(
    private router: Router,
    private chatSvc: ChatService,
    private storageSvc: StorageService
  ) {

    this.loadAllMessages();
    this.message.user = this.storageSvc.cliente();
    this.user = this.storageSvc.cliente();
    this.chatSvc.joinRoom(defaultRoom);
    this.listenerMessage();

    // cuando se cambie la ruta a login se cierra
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === "/Cliente/Login")
        this.closeChat.emit(true);
      }
    });
  }

  /**
   * metodo para la carga de todos los mensajes al principio
   */
  loadAllMessages() {
    this.chatSvc
      .getAllMessagesFromServer()
      .subscribe((messages: ChatMessage[]) => {
        this.messageList = messages;
      });
  }

  /**
   * metodo para el envio de mensajes a una sala.
   * el message -> cliente es el logueado de la sesion
   */
  sendMessage() {
    this.message.fecha_envio = new Date();
    this.chatSvc.sendMessage(defaultRoom, this.message);
    this.message.message = "";
  }

  listenerMessage() {
    this.chatSvc.getMessages().subscribe((messages: ChatMessage[]) => {
      this.loadAllMessages()
    });
  }

  /**
   * metodo para cerrar el chat -> output a padre app.comp
   */
  toggleChatState() {
    this.closeChat.emit(false);
  }

  /**
   * metodo para generar la imagen a partir del rol con el enum UsuarioImagen
   * @param rol string del rol del usuario del mensaje en cuestion
   * @return string con la ruta de la imagen del usuario
   */
  getUserImage(rol: string): string {
    switch (rol) {
      case "ADMINISTRADOR":
        return UsuarioImagen.ADMIN;
      case "CAMARERO":
        return UsuarioImagen.CAMARERO;
      case "COCINERO":
        return UsuarioImagen.COCINERO;
      default:
        return UsuarioImagen.USUARIO;
    }
  }

  /**
   * metodo para formatear la fecha de un mensaje
   * @param date date de la fecha que queremos formatear
   * @returns string con el formato hace x minutos
   */
  getTime(date: Date): string {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInMs = now.getTime() - messageDate.getTime();
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
  
    if (diffInDays > 0) {
      return `hace ${diffInDays} día${diffInDays > 1 ? 's' : ''}`;
    } else if (diffInHours > 0) {
      return `hace ${diffInHours} hora${diffInHours > 1 ? 's' : ''}`;
    } else if (diffInMinutes > 0) {
      return `hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
    } else {
      return 'justo ahora';
    }
  }
}
