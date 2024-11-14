import { IsString, IsNotEmpty, Length, Matches, IsDate, IsOptional, IsArray, ArrayNotEmpty, ArrayMinSize } from 'class-validator';
import { Transform } from 'class-transformer';

export class ChatInputModel {
  @IsString()
  @IsNotEmpty()
  @Length(3, 10)
  @Matches(/^[a-zA-Z0-9_-]*$/)
  @Transform(({value}) => value.trim())
  name: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  users: string[];
}