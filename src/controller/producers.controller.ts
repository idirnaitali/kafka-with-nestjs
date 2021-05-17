import { Body, Controller, Delete, HttpCode, HttpStatus, Logger, Param, Post, Put } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { KAFKA_CONFIG, MESSAGES_TOPICS } from '../config/kafka.config';
import { Message } from '../model/messsage.models';

@Controller('/api/v1/producers/messages')
export class ProducersController {

  @Client(KAFKA_CONFIG)
  private client: ClientKafka;
  private readonly logger = new Logger(ProducersController.name);

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() message: Message): { status: string } {
    this.logger.log(`${message.pseudo} send new message`);
    this.client.emit(MESSAGES_TOPICS.CREATE, { ...message, time: new Date() });
    return { status: 'ACCEPTED' };
  }

  @Put('/:messageId')
  @HttpCode(HttpStatus.ACCEPTED)
  update(@Param('messageId') messageId: string, @Body() message: Message): { status: string } {
    this.logger.log(`Received put request for message id: ${messageId}`);
    this.client.emit(MESSAGES_TOPICS.UPDATE, { messageId, content: message.content, time: new Date() });
    return { status: 'ACCEPTED' };
  }

  @Delete('/:messageId')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('messageId') messageId: string): { status: string } {
    this.logger.log(`Received delete request for message id: ${messageId}`);
    this.client.emit(MESSAGES_TOPICS.DELETE, { messageId, time: new Date() });
    return { status: 'ACCEPTED' };
  }
}
