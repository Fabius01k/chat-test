import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import {UserController} from "./features/user/controller/user.controller";
import {CreateUserUserCase} from "./features/user/user-cases/createUser.use-case";
import {UserRepository} from "./features/user/repository/user.repository";
import {User} from "./features/entities/user.model";
import {Message} from "./features/entities/message.model";
import {Chat} from "./features/entities/chat.model";
import { CqrsModule } from '@nestjs/cqrs';
import { ChatController } from './features/chat/controller/chat.controller';
import { CreateChatUseCase } from './features/chat/use-cases/createChat.use-case';
import { ChatRepository } from './features/chat/repository/chat.repository';
import { ChatQueryRepository } from './features/chat/repository/chat.query-repository';
import { UserQueryRepository } from './features/user/repository/user.query-repository';
import { MessageController } from './features/message/controller/message.controller';
import { CreateMessageUseCase } from './features/message/use-cases/sendMessage.use-case';
import { MessageRepository } from './features/message/repository/message.repository';
import { MessageQueryRepository } from './features/message/repository/message.query-repository';

dotenv.config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
      url: process.env.NEON_URL,
      ssl: { rejectUnauthorized: false },
    }),
    TypeOrmModule.forFeature([User, Chat, Message]),
    CqrsModule,
  ],
  controllers: [UserController,ChatController,MessageController],
  providers: [
    CreateUserUserCase,
    CreateChatUseCase,
    CreateMessageUseCase,

    UserRepository,
    ChatRepository,
    MessageRepository,

    ChatQueryRepository,
    UserQueryRepository,
    MessageQueryRepository
  ],
})
export class AppModule {}
