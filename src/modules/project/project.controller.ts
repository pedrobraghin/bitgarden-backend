import { AuthGuard } from '@nestjs/passport';
import { ProjectService } from './project.service';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserData, UserDataType } from 'src/common';
import { CreateProjectDto } from './dtos';

@Controller('projects')
@UseGuards(AuthGuard('jwt'))
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  async createProject(
    @UserData() user: UserDataType,
    @Body() data: CreateProjectDto,
  ) {
    return await this.projectService.createProject(user.id, data);
  }

  @Get('my')
  async listUserProjects(@UserData() user: UserDataType) {
    return await this.projectService.getUserProjects(user.id);
  }

  @Get(':id')
  async getProjectById(@Param('id') projectId: string) {
    return await this.projectService.getProjectById(projectId);
  }

  @Get()
  async listProjects() {
    return await this.projectService.listProjects();
  }
}
