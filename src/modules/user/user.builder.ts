import { Injectable } from '@nestjs/common';
import { PublicUser, User } from 'src/@types';

@Injectable()
export class UserBuilder {
  publicUser(user: User): PublicUser {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      avatarUrl: user.avatarUrl,
      email: user.email,
      provider: user.provider,
    };
  }
}
