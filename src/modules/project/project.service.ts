import { ProjectRole } from 'src/@types';
import { CreateProjectDto } from './dtos';
import { ProjectRepository } from './project.repository';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  async createProject(userId: string, data: CreateProjectDto) {
    const project = await this.projectRepository.createProject({
      ...data,
      ownerId: userId,
    });

    if (!project) {
      throw new InternalServerErrorException();
    }

    const projectMember = await this.projectRepository.addProjectMember({
      projectId: project.id,
      role: ProjectRole.OWNER,
      userId,
    });

    if (!projectMember) {
      throw new InternalServerErrorException();
    }

    return project;
  }

  async getUserProjects(userId: string) {
    const [memberProjects, ownedProjects] = await Promise.all([
      this.projectRepository.getMemberProjects(userId),
      this.projectRepository.getOwnedProjects(userId),
    ]);

    const projects = memberProjects.map((mp) => mp.project);

    return [...ownedProjects, ...projects];
  }

  async getProjectById(id: string) {
    const project = await this.projectRepository.getProjectById(id);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    return project;
  }

  async listProjects() {
    const projects = await this.projectRepository.getProjects();
    return projects;
  }
}
