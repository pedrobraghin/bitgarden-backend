import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos';
import { UserData, UserDataType } from 'src/common';

@Controller('users')
export class UserController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly userService: UserService,
  ) {}

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async getUser(@UserData() user: UserDataType) {
    this.logger.info('UserController > getUser');
    return await this.userService.getUserById(user.id);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Body() data: UpdateUserDto,
    @UserData() user: UserDataType,
  ) {
    this.logger.info('UserController > getUser');
    return await this.userService.updateUser(user.id, data);
  }

  @Get('username-availability/:username')
  async checkUsernameAvailability(@Param('username') username: string) {
    return await this.userService.checkUsernameAvailability(username);
  }
}
