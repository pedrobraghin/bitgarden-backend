import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { UserData, UserDataType } from 'src/common';
import { UpdateProfileDto } from './dtos';

@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Patch()
  async updateProfile(
    @UserData() user: UserDataType,
    @Body() data: UpdateProfileDto,
  ) {
    return await this.profileService.updateProfile(
      user.id,
      user.profile.id,
      data,
    );
  }
}
