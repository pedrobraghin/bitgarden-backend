import { ProviderProfile, User } from 'src/@types';
import { UserRepository } from './user.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserDto, UpdateUserDto, GetUserResDto } from './dtos';
import { randomUUID } from 'node:crypto';
import { MailService } from '../mail/mail.service';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileService: ProfileService,
    private readonly mailSerivce: MailService,
  ) {}

  async createUser(data: ProviderProfile) {
    const userData: UserDto = {
      email: data.emails[0].value,
      name: data.displayName,
      providerId: data.id,
      provider: data.provider,
      avatarUrl: data.photos?.[0]?.value,
      username: `user@${randomUUID()}`,
    };

    if (!userData.email) {
      throw new BadRequestException('E-mail is required');
    }

    let user: User = await this.userRepository.getUser({
      email: userData.email,
    });

    if (user) {
      throw new BadRequestException('E-mail logged with another provider');
    }

    user = await this.userRepository.createUser(userData);
    await this.profileService.createProfile(user.id);
    await this.mailSerivce.sendWelcomeEmail(user.email);

    return user;
  }

  async getUserByProviderId(providerId: string) {
    if (!providerId) {
      throw new BadRequestException('Provider ID is required');
    }

    return this.userRepository.getUser({ providerId });
  }

  async getUserById(id: string): Promise<GetUserResDto> {
    return this.userRepository.getUserWithProfile({ id, profile: true });
  }

  async updateUser(id: string, data: UpdateUserDto) {
    if (Object.keys(data).length === 0) {
      throw new BadRequestException('At least one field required to update.');
    }

    if (data.username) {
      const usernameAlreadyInUse = await this.userRepository.getUser({
        username: data.username,
      });

      if (usernameAlreadyInUse) {
        throw new BadRequestException('Username already in use');
      }

      data.username = data.username.toLowerCase();
    }

    await this.userRepository.updateUser(id, data);
  }

  async checkUsernameAvailability(username: string) {
    const user = await this.userRepository.getUser({
      username,
    });

    if (!user)
      return {
        available: true,
      };

    return {
      available: user.username === username.toLowerCase(),
    };
  }
}
