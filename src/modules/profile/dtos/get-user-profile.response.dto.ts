import { Exclude, Expose, Transform } from 'class-transformer';

export class GetUserProfileResDto {
  id: string;
  headline?: string;
  bio?: string;
  location?: string;
  websiteUrl?: string;
  availableForOpportunities: boolean;

  @Transform(
    ({ value }) =>
      `${process.env.GITHUB_BASE_PROFILE_URL}/${value.linkedinUsername}`,
  )
  @Expose({ name: 'githubUrl' })
  githubUsername?: string;

  @Transform(
    ({ value }) =>
      `${process.env.LINKEDIN_BASE_PROFILE_URL}/${value.linkedinUsername}`,
  )
  @Expose({ name: 'linkedinUrl' })
  linkedinUsername?: string;
  @Exclude()
  userId: string;
  @Exclude()
  createdAt: Date;
  @Exclude()
  active: boolean;
  @Exclude()
  updatedAt: Date;
}
