import { PublicUser, User } from 'src/@types';

export class UserBuilder {
  static publicUser(user: User): PublicUser {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      avatarUrl: user.avatarUrl,
    };
  }
}
