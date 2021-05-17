import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message, MessageEntity } from '../model/messsage.models';
import { Repository } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity) private readonly messagesRepository: Repository<MessageEntity>,
  ) {
  }

  async create(message: Message): Promise<Message> {
    try {
      return this.messagesRepository.save(message);
    } catch (e) {
      throw new InternalServerErrorException('Failed to save message', e);
    }
  }

  async update(messageId: number, content: string): Promise<void> {
    const entity = await this.getMessage(messageId);
    try {
      entity.content = content;
      await this.messagesRepository.update({id: messageId}, entity);
    } catch (e) {
      throw new InternalServerErrorException('Failed to update message', e);
    }
  }

  async delete(messageId: number): Promise<void> {
    await this.getMessage(messageId);
    try {
      await this.messagesRepository.delete({id: messageId});
    } catch (e) {
      throw new InternalServerErrorException('Failed to delete message', e);
    }
  }

  private async getMessage(messageId: number): Promise<MessageEntity> {
    const entity = await this.messagesRepository.findOne(messageId);
    if (!entity) {
      throw new NotFoundException('Message with id: ' + messageId + ' was not found');
    }
    return entity;
  }
}
