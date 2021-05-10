import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import {
  Client,
  ClientKafka,
  EventPattern, Transport,
} from '@nestjs/microservices';

@Controller()
export class AppController {


  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'ping',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'ping-consumer',
      },
    },
  })
  private client: ClientKafka;
  private readonly logger = new Logger(AppController.name);

  onModuleInit() {
    this.logger.log({ massage: `Subscribing to response of pattern: ping-create` });
    this.client.subscribeToResponseOf('ping-create');
  }

  @HttpCode(HttpStatus.ACCEPTED)
  @Get('/ping')
  ping(): { message: string } {
    this.client.emit<string>('ping-create', 'Received PING... today at ' + new Date().toLocaleTimeString());
    return { message: `accepted ping...` };
  }

  @EventPattern('ping-create')
  async handlePing(payload: any) {
    this.logger.log({ value: payload.value, status: 'created' });
  }
}
