import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateProfileDto } from './dtos';
import { ProfileRepository } from './profile.repository';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async createProfile(userId: string) {
    const profile = await this.profileRepository.createProfile(userId);

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
    const updatedProfile = await this.profileRepository.updateProfile(
      userId,
      profileId,
      data,
    );

    return updatedProfile;
  }
}
