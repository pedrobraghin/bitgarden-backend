export class Profile {
  id: string;
  userId: string;
  headline?: string;
  bio?: string;
  location?: string;
  githubUsername?: string;
  linkedinUsername?: string;
  websiteUrl?: string;
  active: boolean;
  availableForOpportunities: boolean;
  createdAt: Date;
  updatedAt: Date;
}
