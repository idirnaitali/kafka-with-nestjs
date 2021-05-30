import { Body, Controller, Logger } from '@nestjs/common';
import { Client, ClientKafka, EventPattern } from '@nestjs/microservices';
import { KAFKA_CONFIG, MESSAGES_TOPICS } from '../config/kafka.config';
import { MessageService } from '../service/messages.service';
import { WebSocketService } from '../service/web.socket.service';

@Controller('/api/v1/consumers/messages')
export class ConsumersController {


  constructor(
    private readonly messageService: MessageService,
    private readonly webSocketService: WebSocketService,
  ) {
  }

  @Client(KAFKA_CONFIG)
  private client: ClientKafka;
  private readonly logger = new Logger(ConsumersController.name);

  async onModuleInit() {
    for (const key in MESSAGES_TOPICS) {
      await this.client.subscribeToResponseOf(MESSAGES_TOPICS[key]);
      this.logger.log('Subscribing to topic: ' + MESSAGES_TOPICS[key]);
    }
  }


  @EventPattern(MESSAGES_TOPICS.CREATE)
  create(payload: any) {
    this.logger.log({ event: 'Creating message', message: payload.value });
    this.messageService.create(payload.value)
      .then(createdMessage => {
        this.logger.log('message created id:' + createdMessage.id);
        this.webSocketService.handleCreation(createdMessage);
      })
      .catch(reason => this.logger.error({ message: 'Failed to create message', reason }));
    return 'created...';
  }

  @EventPattern(MESSAGES_TOPICS.UPDATE)
  update(payload: any) {
    this.logger.log({ event: 'updating message', message: payload.value });
    const { id, content } = payload.value;
    this.messageService.update(id, content)
      .then(() => {
        this.logger.log('message updated id:' + id);
        this.webSocketService.handleModification(payload.value);
      })
      .catch(reason => this.logger.error({ message: 'Failed to update message id: ' + id, reason }));
    return 'updated...';
  }

  @EventPattern(MESSAGES_TOPICS.DELETE)
  delete(payload: any) {
    this.logger.log({ event: 'Deleting message', message: payload.value });
    const { id } = payload.value;
    this.messageService.delete(id)
      .then(() => {
        this.logger.log('message deleted id:' + id);
        this.webSocketService.handleDeletion(id);
      })
      .catch(reason => this.logger.error({ message: 'Failed to delete message id: ' + id, reason }));
    return 'deleted...';
  }
}
