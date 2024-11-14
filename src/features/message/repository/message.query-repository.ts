import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from '../../entities/message.model';
import { Repository } from 'typeorm';
import { ChatQueryRepository } from '../../chat/repository/chat.query-repository';

@Injectable()
export class MessageQueryRepository {
  constructor(
    @InjectRepository(Message)
    private readonly messageQueryRepository: Repository<Message>,
    protected chatQueryRepository: ChatQueryRepository,
  ) {}

  async findMessagesByChatId(chatId: string): Promise<Message[]> {

    const chatExists = await this.chatQueryRepository.findChatById(chatId);
    if (!chatExists) {
      throw new NotFoundException([
        {
          message: 'Chat not found',
        },
      ]);
    }

    const foundMessages = await this.messageQueryRepository
      .createQueryBuilder('message')
      .innerJoinAndSelect('message.chat', 'chat')
      .innerJoinAndSelect('message.author', 'author')
      .where('chat.id = :chatId', { chatId })
      .orderBy('message.created_at', 'ASC')
      .getMany();

    if (foundMessages.length === 0) {
      throw new NotFoundException([
        {
          message: 'No message for this chat',
        },
      ]);
    }

    return foundMessages
  }
}