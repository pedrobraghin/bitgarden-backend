import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateProject, AddProjectMember } from './dtos';
import { Project, ProjectMember } from 'src/@types';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createProject(data: CreateProject): Promise<Project> {
    return this.prismaService.project.create({
      data,
    });
  }

  async addProjectMember(data: AddProjectMember) {
    return this.prismaService.projectMember.create({
      data,
    });
  }

  async getMemberProjects(userId: string): Promise<ProjectMember[]> {
    return this.prismaService.projectMember.findMany({
      where: {
        userId,
      },
      include: {
        project: true,
      },
    });
  }

  async getOwnedProjects(ownerId: string): Promise<Project[]> {
    return this.prismaService.project.findMany({
      where: {
        ownerId,
      },
    });
  }

  async getProjectById(id: string): Promise<Project | null> {
    return this.prismaService.project.findFirst({
      where: {
        id,
      },
    });
  }

  async getProjects() {
    return this.prismaService.project.findMany();
  }

  async searchProjectsByName(name: string) {
    return this.prismaService.project.findMany({
      where: {
        OR: [
          {
            name: {
              contains: name,
            },
          },
          {
            name: {
              startsWith: name,
            },
          },
        ],
      },
    });
  }
}
