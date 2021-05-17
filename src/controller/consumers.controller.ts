import { Body, Controller, Logger } from '@nestjs/common';
import { Client, ClientKafka, EventPattern } from '@nestjs/microservices';
import { KAFKA_CONFIG, MESSAGES_TOPICS } from '../config/kafka.config';
import { MessageService } from '../service/messages.service';

@Controller('/api/v1/consumers/messages')
export class ConsumersController {


  constructor(
    private readonly messageService: MessageService,
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
      .then(m => this.logger.log('message created id:' + m.id))
      .catch(reason => this.logger.error({ message: 'Failed to create message', reason }));
    return 'created...';
  }

  @EventPattern(MESSAGES_TOPICS.UPDATE)
  update(payload: any) {
    this.logger.log({ event: 'updating message', message: payload.value });
    const { messageId, content } = payload.value;
    this.messageService.update(messageId, content)
      .then(() => this.logger.log('message updated id:' + messageId))
      .catch(reason => this.logger.error({ message: 'Failed to update message id: ' + messageId, reason }));
    return 'updated...';
  }

  @EventPattern(MESSAGES_TOPICS.DELETE)
  delete(payload: any) {
    this.logger.log({ event: 'Deleting message', message: payload.value });
    const { messageId } = payload.value;
    this.messageService.delete(messageId)
      .then(() => this.logger.log('message deleted id:' + messageId))
      .catch(reason => this.logger.error({ message: 'Failed to delete message id: ' + messageId, reason }));
    return 'deleted...';
  }
}
