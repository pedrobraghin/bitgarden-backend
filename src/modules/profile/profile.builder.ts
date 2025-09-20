import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'src/@types';

@Injectable()
export class ProfileBuilder {
  constructor(private readonly configService: ConfigService) {}

  publicProfile(data: Profile) {
    const githubUrl = data.githubUsername
      ? `${this.configService.get('GITHUB_BASE_PROFILE_URL')}/${data.githubUsername}`
      : null;

    const linkedinUrl = data.linkedinUsername
      ? `${this.configService.get('LINKEDIN_BASE_PROFILE_URL')}/${data.linkedinUsername}`
      : null;

    return {
      id: data.id,
      headline: data.headline,
      bio: data.bio,
      location: data.location,
      githubUrl,
      linkedinUrl,
      websiteUrl: data.websiteUrl,
      availableForOpportunities: data.availableForOpportunities,
    };
  }
}
