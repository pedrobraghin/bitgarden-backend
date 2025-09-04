import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { GetProfileFilter, ProfileDto } from './dtos';
import { Profile } from 'src/@types';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createProfile(profileData: ProfileDto): Promise<Profile> {
    return this.prismaService.profile.create({
      data: profileData,
    });
  }

  async getProfile(filter: GetProfileFilter): Promise<Profile | null> {
    return this.prismaService.profile.findFirst({
      where: {
        AND: [
          {
            OR: [
              { id: filter.id },
              { email: filter.email },
              {
                provider: filter.provider,
                providerId: filter.providerId,
              },
              {
                username: filter.username,
              },
            ],
          },
          {
            active: true,
          },
        ],
      },
    });
  }

  async deleteProfileById(id: string): Promise<Profile> {
    return this.prismaService.profile.update({
      where: { id, active: true },
      data: { active: false },
    });
  }

  async updateProfile(
    id: string,
    profileData: Partial<ProfileDto>,
  ): Promise<Profile> {
    return this.prismaService.profile.update({
      where: { id, active: true },
      data: profileData,
    });
  }
}
