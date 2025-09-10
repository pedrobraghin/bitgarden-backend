import { ProjectRole } from 'src/@types';

export class AddProjectMember {
  projectId: string;
  role: ProjectRole;
  userId: string;
}
