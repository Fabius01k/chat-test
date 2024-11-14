import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../../entities/message.model';
import { Repository } from 'typeorm';

@
  Injectable()
export class MessageRepository {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async createMessage(newMessage: Message): Promise<Message> {
    return await this.messageRepository.save(newMessage);
  }
}