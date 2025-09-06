import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { GetUserFilter, UserDto } from './dtos';
import { User } from 'src/@types';

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
        Profile: filter.profile,
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
