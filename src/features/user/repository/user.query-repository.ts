import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.model';
import { Repository } from 'typeorm';
import { UserView } from '../../viewResponseTypes/user.viewType';

@Injectable()
export class UserQueryRepository {
  constructor(
    @InjectRepository(User)
    protected userQueryRepository: Repository<User>
  ) {
  }

  async findUserById(userId: string): Promise<UserView> {
    return await this.userQueryRepository.findOne({
      where: { id: userId }
    })
  }
}