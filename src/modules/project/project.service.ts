import { ProjectRepository } from './project.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepository: ProjectRepository) {}
}
