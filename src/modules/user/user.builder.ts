import { Profile, PublicUser, User } from 'src/@types';

export class UserBuilder {
  static publicUser(user: User & { profile: Profile }): PublicUser {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      avatarUrl: user.avatarUrl,
      headline: user.profile.headline,
      bio: user.profile.bio,
      location: user.profile.location,
      githubUsername: user.profile.githubUsername,
      linkedinUsername: user.profile.linkedinUsername,
      websiteUrl: user.profile.websiteUrl,
      availableForOpportunities: user.profile.availableForOpportunities,
    };
  }
}
