import { Module } from '@nestjs/common';
import { ModelModule } from '../model/model.module';
import { MessageService } from './messages.service';

@Module({
  imports: [ModelModule],
  providers: [MessageService],
  exports: [MessageService],
})
export class ServiceModule {}
