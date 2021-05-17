import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './messsage.models';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  exports: [TypeOrmModule],
})
export class ModelModule {}
