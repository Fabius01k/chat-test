import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {UserInputModel} from "../../input-models/user.inputModel";
import {UserView} from "../../viewResponseTypes/user.viewType";
import {User} from "../../entities/user.model";
import {UserRepository} from "../repository/user.repository";


export class CreateUserCommand {
    constructor(public userDto: UserInputModel) {}
}
@CommandHandler(CreateUserCommand)
export class CreateUserUserCase implements ICommandHandler<CreateUserCommand> {
    constructor(
        protected userRepository: UserRepository,
    ) {}

    async execute(command: CreateUserCommand): Promise<UserView> {

        const newUser = new User();
        newUser.username = command.userDto.username
        newUser.createdAt = new Date()

        return await this.userRepository.createUser(newUser);
    }
}