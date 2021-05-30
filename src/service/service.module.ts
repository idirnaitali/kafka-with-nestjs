import { Module } from '@nestjs/common';
import { ModelModule } from '../model/model.module';
import { MessageService } from './messages.service';
import { WebSocketService } from './web.socket.service';

@Module({
  imports: [ModelModule],
  providers: [MessageService, WebSocketService],
  exports: [MessageService, WebSocketService],
})
export class ServiceModule {}
