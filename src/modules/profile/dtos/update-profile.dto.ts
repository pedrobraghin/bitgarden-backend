import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  username: string;
}
