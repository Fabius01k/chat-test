import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChatInputModel } from '../../input-models/chat.inputModel';
import { Chat } from '../../entities/chat.model';
import { ChatView } from '../../viewResponseTypes/chat.viewType';
import { ChatRepository } from '../repository/chat.repository';
import { UserQueryRepository } from '../../user/repository/user.query-repository';
import { NotFoundException } from '@nestjs/common';

export class CreateChatCommand {
  constructor(public chatDto: ChatInputModel) {}
}
@CommandHandler(CreateChatCommand)
export class CreateChatUseCase implements ICommandHandler<CreateChatCommand> {
  constructor(
    protected chatRepository: ChatRepository,
    protected userQueryRepository: UserQueryRepository,
  ) {}

  async execute(command: CreateChatCommand): Promise<ChatView> {

    const userOne = await this.userQueryRepository.findUserById(command.chatDto.users[0])
    const userTwo = await this.userQueryRepository.findUserById(command.chatDto.users[1])
    if (!userOne || !userTwo) {
      throw new NotFoundException([
        {
          message: 'Users not found',
        },
      ]);
    }

    const newChat = new Chat();
    newChat.name = command.chatDto.name;
    newChat.users = [userOne,userTwo];
    newChat.createdAt  = new Date()

    return await this.chatRepository.createChat(newChat);
  }
}