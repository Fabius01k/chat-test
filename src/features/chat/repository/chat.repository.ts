import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from '../../entities/chat.model';
import { ChatView } from '../../viewResponseTypes/chat.viewType';


@Injectable()
export class ChatRepository {
  constructor(
    @InjectRepository(Chat)
    protected chatRepository: Repository<Chat>
  ) {
  }

  async createChat(newChat: Chat): Promise<ChatView> {
    return await this.chatRepository.save(newChat);
  }
}