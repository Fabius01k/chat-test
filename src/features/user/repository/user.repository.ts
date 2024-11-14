import {Injectable} from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from "../../entities/user.model";
import {UserView} from "../../viewResponseTypes/user.viewType";

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        protected userRepository: Repository<User>
    ) {
    }

    async createUser(newUser: User): Promise<UserView> {
        return await this.userRepository.save(newUser);
    }
}