import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from '../../entities/chat.model';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.model';
import { async } from 'rxjs';
import { UserQueryRepository } from '../../user/repository/user.query-repository';

@Injectable()
export class ChatQueryRepository {
  constructor(
    @InjectRepository(Chat)
    protected chatQueryRepository: Repository<Chat>,
    protected userQueryRepository: UserQueryRepository,
  ) {
  }
  async findChatById(chatId: string): Promise<Chat> {
    return await this.chatQueryRepository.findOne({
      where: { id: chatId }
    })
  }

  async findAllChatsByUserId(userId: string): Promise<Chat[]> {

    const userExists = await this.userQueryRepository.findUserById(userId);
    if (!userExists) {
      throw new NotFoundException([
        {
          message: 'User not found',
        },
      ]);
    }

    const foundChats = await this.chatQueryRepository
      .createQueryBuilder('chat')
      .innerJoinAndSelect('chat.users', 'user')
      .leftJoinAndSelect('chat.messages', 'message')
      .where('user.id = :userId', { userId })
      .groupBy('chat.id')
      .addGroupBy('user.id')
      .addGroupBy('message.id')
      .orderBy('MAX(message.created_at)', 'DESC')
      .getMany();

    if (foundChats.length === 0) {
      throw new NotFoundException([
        {
          message: 'No chats found for this user',
        },
      ]);
    }

    return foundChats
  }
}