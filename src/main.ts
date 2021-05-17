import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { KAFKA_CONFIG } from './config/kafka.config';

const logger = new Logger('MAIN');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(KAFKA_CONFIG);
  await app.startAllMicroservicesAsync();
  await app.listen(3000, () => logger.log('All microservices are UP... listening on port: 3000'));
}

bootstrap();
