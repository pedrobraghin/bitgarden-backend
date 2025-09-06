import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpdateProfileDto } from './dtos';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prismaService: PrismaService) {}

  crateProfile(userId: string) {
    return this.prismaService.profile.create({
      data: {
        userId,
      },
    });
  }

  getProfile(userId: string) {
    return this.prismaService.profile.findUnique({
      where: {
        userId,
        active: true,
      },
    });
  }

  deleteProfile(userId: string, profileId: string) {
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

  updateProfile(userId: string, profileId: string, data: UpdateProfileDto) {
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
