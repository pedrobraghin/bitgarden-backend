export type Project = {
  id: string;
  name: string;
  description: string;
  repositoryUrl: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
};

export enum ProjectRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER',
  OWNER = 'OWNER',
}

export type ProjectMember = {
  projectId: string;
  userId: string;
  role: keyof typeof ProjectRole;
  project: Project;
  createdAt: Date;
  updatedAt: Date;
};
