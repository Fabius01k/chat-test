import { IsString, IsNotEmpty, Length, Matches, IsDate, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UserInputModel {
    @IsString()
    @IsNotEmpty()
    @Length(3, 10)
    @Matches(/^[a-zA-Z0-9_-]*$/)
    @Transform(({value}) => value.trim())
    username: string;
}