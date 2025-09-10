import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prismaService: PrismaService) {}
}
