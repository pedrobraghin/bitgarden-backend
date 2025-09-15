import { Exclude } from 'class-transformer';
import { GetUserProfileResDto } from 'src/modules/profile';

export class GetUserResDto {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  createdAt: Date;
  email: string;

  profile: GetUserProfileResDto;

  @Exclude()
  provider: string;
  @Exclude()
  providerId: string;
  @Exclude()
  active: boolean;
  @Exclude()
  updatedAt: Date;
}
