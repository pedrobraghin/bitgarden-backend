import { Injectable } from '@nestjs/common';
import { FilterQueryDto } from './dtos';
import { UserBuilder, UserRepository } from '../user';
import { Project, PublicUser } from 'src/@types';
import { ProjectRepository } from '../project';

@Injectable()
export class SearchService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly userBuilder: UserBuilder,
  ) {}

  async searchByTerm(term: string, filter: FilterQueryDto) {
    const results: { users: PublicUser[]; projects: Project[] } = {
      users: [],
      projects: [],
    };

    if (filter.users) {
      const userResults = await this.userRepository.searchUsersByUsername(term);

      if (userResults.length)
        results.users = userResults.map(this.userBuilder.publicUser);
    }

    if (filter.projects) {
      const projectResults =
        await this.projectRepository.searchProjectsByName(term);

      if (projectResults.length) results.projects = projectResults;
    }

    return results;
  }
}
