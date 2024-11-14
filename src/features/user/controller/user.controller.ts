import {Body, Controller, Post} from "@nestjs/common";
import { CommandBus } from '@nestjs/cqrs';
import {UserInputModel} from "../../input-models/user.inputModel";
import {UserView} from "../../viewResponseTypes/user.viewType";
import {CreateUserCommand} from "../user-cases/createUser.use-case";

@Controller('users')
export class UserController {
    constructor( private readonly commandBus: CommandBus,) {}

    @Post('add')
    async createUser(@Body() userDto: UserInputModel): Promise<UserView> {
        return await this.commandBus.execute(new CreateUserCommand(userDto));
    }
}