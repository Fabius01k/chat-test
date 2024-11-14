import { User } from '../entities/user.model';

export type MessageView = {
  chat: string;
  text: string;
  author: User;
};