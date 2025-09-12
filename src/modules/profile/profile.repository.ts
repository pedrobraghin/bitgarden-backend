import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpdateProfileDto } from './dtos';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createProfile(userId: string, data?: UpdateProfileDto) {
    return this.prismaService.profile.create({
      data: {
        userId,
        ...data,
      },
    });
  }

  async getProfile(userId: string) {
    return this.prismaService.profile.findUnique({
      where: {
        userId,
        active: true,
      },
    });
  }

  async deleteProfile(userId: string, profileId: string) {
    return this.prismaService.profile.update({
      where: {
        id: profileId,
        userId,
      },
      data: {
        active: false,
      },
    });
  }

  async updateProfile(
    userId: string,
    profileId: string,
    data: UpdateProfileDto,
  ) {
    return this.prismaService.profile.update({
      where: {
        id: profileId,
        userId,
        active: true,
      },
      data,
    });
  }
}
