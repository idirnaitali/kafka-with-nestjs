import { Module } from '@nestjs/common';
import { ServiceModule } from '../service/service.module';
import { ModelModule } from '../model/model.module';
import { ConsumersController } from './consumers.controller';
import { ProducersController } from './producers.controller';

@Module({
  imports: [ServiceModule, ModelModule],
  controllers: [ConsumersController, ProducersController],
})
export class ControllerModule {}
