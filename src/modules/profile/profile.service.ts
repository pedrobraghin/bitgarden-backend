import { ProviderProfile } from 'src/@types';
import { ProfileRepository } from './profile.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProfileDto, UpdateProfileDto } from './dtos';
import { randomUUID } from 'node:crypto';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async createProfile(data: ProviderProfile) {
    const profileData: ProfileDto = {
      email: data.emails[0].value,
      name: data.displayName,
      providerId: data.id,
      provider: data.provider,
      avatarUrl: data.photos?.[0]?.value,
      username: `user@${randomUUID()}`,
    };

    if (!profileData.email) {
      throw new BadRequestException('E-mail is required');
    }

    let profile = await this.profileRepository.getProfile({
      email: profileData.email,
    });

    if (profile) {
      throw new BadRequestException('E-mail logged with another provider');
    }

    profile = await this.profileRepository.createProfile(profileData);

    return profile;
  }

  async getProfileByProviderId(providerId: string) {
    if (!providerId) {
      throw new BadRequestException('Provider ID is required');
    }

    return this.profileRepository.getProfile({ providerId });
  }

  async getProfileById(id: string) {
    return this.profileRepository.getProfile({ id });
  }

  async updateProfile(id: string, { username }: UpdateProfileDto) {
    const usernameAlreadyInUse = await this.profileRepository.getProfile({
      username,
    });

    if (usernameAlreadyInUse) {
      throw new BadRequestException('Username already in use');
    }

    await this.profileRepository.updateProfile(id, {
      username: username.toLowerCase(),
    });
  }

  async checkUsernameAvailability(username: string) {
    const profile = await this.profileRepository.getProfile({
      username,
    });

    if (!profile)
      return {
        available: true,
      };

    return {
      available: profile.username === username.toLowerCase(),
    };
  }
}
