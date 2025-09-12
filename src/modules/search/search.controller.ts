import { Controller, Get, Param, Query } from '@nestjs/common';
import { FilterQueryDto } from './dtos/filter-query.dto';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Get(':term')
  async searchByTerm(
    @Param('term') term: string,
    @Query() filter: FilterQueryDto,
  ) {
    return this.searchService.searchByTerm(term, filter);
  }
}
