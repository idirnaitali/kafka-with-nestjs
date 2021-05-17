import { KafkaOptions, Transport } from '@nestjs/microservices';

export const KAFKA_CONFIG: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'messages',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'messages-consumer',
    },
  },
};

export enum MESSAGES_TOPICS {
  CREATE = 'messages.create',
  UPDATE = 'messages.update',
  DELETE = 'messages.delete',
}
