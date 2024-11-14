import { User } from '../entities/user.model';

export type ChatView = {
  id: string;
  name: string;
  createdAt: Date;
  users: User[];
};