import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Message } from '../model/messsage.models';
import { MESSAGES_TOPICS } from '../config/kafka.config';

@WebSocketGateway(8080)
export class WebSocketService implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server;
  private readonly logger = new Logger(WebSocketService.name);

  handleConnection(socket: Socket): void {
    this.logger.log('Connection... socket id:' + socket.id);
  }

  handleDisconnect(socket: Socket): void {
    this.logger.log('Disconnect... socket id:' + socket.id);
  }

  handleCreation(message: Message) {
    this.logger.log({
      message: 'Emitting message event',
      eventType: MESSAGES_TOPICS.CREATE,
      content: message,
    });
    this.server.emit(MESSAGES_TOPICS.CREATE, message);
  }

  handleModification(message: Message) {
    this.logger.log({
      message: 'Emitting message event',
      eventType: MESSAGES_TOPICS.UPDATE,
      content: message,
    });
    this.server.emit(MESSAGES_TOPICS.UPDATE, message);
  }

  handleDeletion(messageId: number) {
    this.logger.log({ message: 'Emitting message event', eventType: MESSAGES_TOPICS.DELETE, messageId });
    this.server.emit(MESSAGES_TOPICS.DELETE, { messageId });
  }

 /*
  @SubscribeMessage(MESSAGES_TOPICS.CREATE)
  async onCreate(socket: Socket, data: any) {
    this.logger.log({ message: 'Received message event', eventType: MESSAGES_TOPICS.CREATE, data });
  }

  @SubscribeMessage(MESSAGES_TOPICS.UPDATE)
  async onModification(socket: Socket, data: any) {
    this.logger.log({ message: 'Received message event', eventType: MESSAGES_TOPICS.UPDATE, data });
  }

  @SubscribeMessage(MESSAGES_TOPICS.DELETE)
  async onDeletion(socket: Socket, data: any) {
    this.logger.log({ message: 'Received message event', eventType: MESSAGES_TOPICS.DELETE, data });
  }
  */
}
