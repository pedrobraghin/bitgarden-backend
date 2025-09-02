import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly profileService: ProfileService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Req() req: Request) {
    this.logger.info('ProfileController > getProfile');
    return await this.profileService.getProfileById(req.user['sub']);
  }
}
