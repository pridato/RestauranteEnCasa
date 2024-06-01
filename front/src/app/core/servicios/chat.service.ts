import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { springUrl, webSocketUrl } from 'src/app/shared/globales/globales';
import { ChatMessage } from '../models/ChatMessage';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private stompClient: any;

  private messageSubject:BehaviorSubject<ChatMessage[]> = new BehaviorSubject<ChatMessage[]>([])

  constructor(private http: HttpClient) {
    this.initConnectionSocket();
   }

  /**
   * metodo para conectarnos con el websocket de spring a traves de sockjs
   */
  initConnectionSocket() {
    const url = `${webSocketUrl}/chat-socket`
    const socket = new SockJS(url);
    this.stompClient = Stomp.over(socket);

     // Configurar el nivel de depuración para no mostrar logs
     this.stompClient.debug = () => {};
  }


  /**
   * metodo para unirnos a una sala desde spring nos dirigimos a @SendTo("/topic/{roomId}")
   * @param roomId string de la room que nos interesa
   */
  joinRoom(roomId:string){
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(`/topic/${roomId}`, (message:any) => {
        const messageContent = JSON.parse(message.body);
        this.messageSubject.next([...this.messageSubject.value, messageContent])
      });
    });
  }

  /**
   * metodo para enviar un mensaje a una sala -> si que lo manda al @MessageMapping
   * @param roomId string de la room que nos interesa
   * @param message ChatMessage del mensaje que queremos enviar
   */
  sendMessage(roomId:string, message:ChatMessage){
    this.stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(message));
  }

  /**
   * metodo para obtener todos los mensajes que se han enviado
   * @returns 
   */
  getMessages() :Observable<ChatMessage[]>{
    return this.messageSubject.asObservable()
  }

  getAllMessagesFromServer(): Observable<ChatMessage[]> {
    return this.http.get<ChatMessage[]>(`${springUrl}/messages`);
  }

}
