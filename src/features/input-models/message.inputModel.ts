import { IsNotEmpty, IsString, Length } from "class-validator";


export class MessageInputModel {
  @IsString()
  @IsNotEmpty()
  chat: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 500)
  text: string;
}