import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProfileDto } from './dtos';
import { ProfileRepository } from './profile.repository';
import { secureLinkRegex } from 'src/utils/regex';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async createProfile(userId: string, data?: UpdateProfileDto) {
    const profile = await this.profileRepository.createProfile(userId, {
      ...data,
      availableForOpportunities: true,
      bio: data?.bio ?? 'Sem biografia',
      headline: data?.headline ?? 'Sem título',
      location: data?.location ?? 'Nenhuma localização informada',
    });

    if (!profile) {
      throw new InternalServerErrorException(
        'Something went wrong creating user profile.',
      );
    }

    return profile;
  }

  async getProfile(userId: string) {
    const profile = await this.profileRepository.getProfile(userId);

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async updateProfile(
    userId: string,
    profileId: string,
    data: UpdateProfileDto,
  ) {
    if (data.websiteUrl && !secureLinkRegex.test(data.websiteUrl)) {
      data.websiteUrl = 'https://' + data.websiteUrl;
    }

    const updatedProfile = await this.profileRepository.updateProfile(
      userId,
      profileId,
      data,
    );

    return updatedProfile;
  }
}
