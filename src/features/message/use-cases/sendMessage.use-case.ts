import { MessageInputModel } from '../../input-models/message.inputModel';
import { Message } from '../../entities/message.model';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChatRepository } from '../../chat/repository/chat.repository';
import { UserQueryRepository } from '../../user/repository/user.query-repository';
import { NotFoundException } from '@nestjs/common';
import { MessageRepository } from '../repository/message.repository';
import { ChatQueryRepository } from '../../chat/repository/chat.query-repository';

export class CreateMessageCommand {
  constructor(public messageDto: MessageInputModel) {}
}

@CommandHandler(CreateMessageCommand)
export class CreateMessageUseCase implements ICommandHandler<CreateMessageCommand> {
  constructor(
    private readonly messageRepository: MessageRepository,
    private readonly chatRepository: ChatRepository,
    private readonly chatQueryRepository: ChatQueryRepository,
    private readonly userQueryRepository: UserQueryRepository,
  ) {}

  async execute(command: CreateMessageCommand): Promise<Message> {
    const { chat: chatId, author: authorId, text } = command.messageDto;

    const chat = await this.chatQueryRepository.findChatById(chatId);
    if (!chat) {
      throw new NotFoundException([
        {
          message: 'Chat not found',
        },
      ]);
    }

    const author = await this.userQueryRepository.findUserById(authorId);
    if (!author) {
      throw new NotFoundException([
        {
          message: 'User not found',
        },
      ]);
    }

    const newMessage = new Message();
    newMessage.chat = chat;
    newMessage.author = author;
    newMessage.text = text;
    newMessage.created_at = new Date();

    return await this.messageRepository.createMessage(newMessage);
  }
}