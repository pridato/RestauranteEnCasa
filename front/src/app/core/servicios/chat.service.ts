import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { webSocketUrl } from 'src/app/shared/globales/globales';
import { ChatMessage } from '../models/ChatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any;

  constructor() { }

  /**
   * metodo para conectarnos con el websocket de spring a traves de sockjs
   */
  initConnectionSocket() {
    const url = `${webSocketUrl}/chat-socket`
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);
  }


  /**
   * metodo para unirnos a una sala desde spring nos dirigimos a @SendTo("/topic/{roomId}")
   * @param roomId string de la room que nos interesa
   */
  joinRoom(roomId:string){
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (message:any) => {
        const messageContent = JSON.parse(message.body);
        console.log(messageContent);
      });
    });
  }

  /**
   * metodo para enviar un mensaje a una sala -> si que lo manda al @MessageMapping
   * @param roomId string de la room que nos interesa
   * @param message string del mensaje que queremos enviar
   */
  sendMessage(roomId:string, message:ChatMessage){
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify({message}));
  }

}
