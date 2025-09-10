import { PrismaService } from './../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateStack, GetStackFilter } from './dtos';

@Injectable()
export class StackRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createStack(data: CreateStack) {
    return this.prismaService.stack.create({
      data,
    });
  }

  async getStack(filter: GetStackFilter) {
    return this.prismaService.stack.findFirst({
      where: {
        OR: [{ name: filter.name }, { slug: filter.slug }],
      },
    });
  }

  async findManyByNameOrSlug(names: string[], slugs: string[]) {
    return this.prismaService.stack.findMany({
      where: {
        OR: [{ name: { in: names } }, { slug: { in: slugs } }],
      },
    });
  }
}
