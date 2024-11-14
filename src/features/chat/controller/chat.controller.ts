import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs'
import { ChatInputModel } from '../../input-models/chat.inputModel';
import { ChatView } from '../../viewResponseTypes/chat.viewType';
import { CreateChatCommand } from '../use-cases/createChat.use-case';
import { ChatQueryRepository } from '../repository/chat.query-repository';
import { Chat } from '../../entities/chat.model';

@Controller('chats')
export class ChatController {
  constructor( private readonly commandBus: CommandBus,
               private readonly chatQueryRepository: ChatQueryRepository
  ) {}


  @Post('add')
  async createChat(@Body() chatDto: ChatInputModel): Promise<ChatView> {
    return await this.commandBus.execute(new CreateChatCommand(chatDto));
  }

  @Post('get')
  async getAllChatsByUserId(@Body(('userId')) userId: string): Promise<Chat[]> {
    return await this.chatQueryRepository.findAllChatsByUserId(userId);
  }


}