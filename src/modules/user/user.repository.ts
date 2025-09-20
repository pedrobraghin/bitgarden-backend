import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { GetUserFilter, UserDto } from './dtos';
import { Profile, User } from 'src/@types';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(userData: UserDto): Promise<User> {
    return this.prismaService.user.create({
      data: userData,
    });
  }

  async getUser(filter: GetUserFilter): Promise<User | null> {
    return this.prismaService.user.findFirst({
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
      include: {
        profile: filter.profile,
      },
    });
  }

  async getUserWithProfile(
    filter: GetUserFilter,
  ): Promise<(User & { profile: Profile }) | null> {
    return this.getUser(filter) as unknown as User & { profile: Profile };
  }

  async searchUsersByUsername(term: string) {
    return this.prismaService.user.findMany({
      where: {
        OR: [
          {
            username: {
              contains: term,
            },
          },
          {
            username: {
              startsWith: term,
            },
          },
        ],
      },
      include: {
        profile: true,
      },
    });
  }

  async deleteUserById(id: string): Promise<User> {
    return this.prismaService.user.update({
      where: { id, active: true },
      data: { active: false },
    });
  }

  async updateUser(id: string, userData: Partial<UserDto>): Promise<User> {
    return this.prismaService.user.update({
      where: { id, active: true },
      data: userData,
    });
  }
}
