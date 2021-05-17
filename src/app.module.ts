import { Module } from '@nestjs/common';
import { DB_CONFIG } from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelModule } from './model/model.module';
import { ServiceModule } from './service/service.module';
import { ControllerModule } from './controller/controller.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DB_CONFIG),
    ModelModule,
    ServiceModule,
    ControllerModule,
  ],
  providers: [],
})
export class AppModule {
}
