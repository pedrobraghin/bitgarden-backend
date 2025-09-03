import { IsNotEmpty, IsString } from 'class-validator';

export class GetOAuthProviderDto {
  @IsString()
  @IsNotEmpty()
  provider: string;
}
