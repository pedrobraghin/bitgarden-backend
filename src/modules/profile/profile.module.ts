import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { ProfileRepository } from './profile.repository';
import { ProfileBuilder } from './profile.builder';

@Module({
  controllers: [ProfileController],
  providers: [ProfileBuilder, ProfileRepository, ProfileService],
  exports: [ProfileService, ProfileRepository, ProfileBuilder],
})
export class ProfileModule {}
