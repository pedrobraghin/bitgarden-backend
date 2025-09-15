import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  username?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  name?: string;
}
