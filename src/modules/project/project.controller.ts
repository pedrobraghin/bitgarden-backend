import { ProjectService } from './project.service';
import { Controller } from '@nestjs/common';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
}
