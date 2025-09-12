import { Module } from '@nestjs/common';
import { UserModule } from '../user';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { ProjectModule } from '../project';

@Module({
  imports: [UserModule, ProjectModule],
  providers: [SearchService],
  controllers: [SearchController],
})
export class SearchModule {}
