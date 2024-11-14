import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateMessageCommand } from '../use-cases/sendMessage.use-case';
import { MessageInputModel } from '../../input-models/message.inputModel';
import { MessageView } from '../../viewResponseTypes/message.viewType';
import { Message } from '../../entities/message.model';
import { MessageQueryRepository } from '../repository/message.query-repository';

@Controller('messages')
export class MessageController {
  constructor( private readonly commandBus: CommandBus,
               private readonly messageQueryRepository: MessageQueryRepository) {}

  @Post('add')
  async createUser(@Body() messageDto: MessageInputModel): Promise<MessageView> {
    return await this.commandBus.execute(new CreateMessageCommand(messageDto));
  }

  @Post('get')
  async getMessagesByChatId(@Body('chatId') chatId: string): Promise<Message[]> {
    return await this.messageQueryRepository.findMessagesByChatId(chatId);
  }

}