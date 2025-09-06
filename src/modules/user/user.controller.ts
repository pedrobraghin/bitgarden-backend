import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos';
import { UserId } from 'src/common/auth-id.decorator';

@Controller('user')
export class UserController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUser(@Req() req: Request) {
    this.logger.info('UserController > getUser');
    return await this.userService.getUserById(req.user['sub']);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  async updateUser(@Body() data: UpdateUserDto, @UserId() id: string) {
    this.logger.info('UserController > getUser');
    return await this.userService.updateUser(id, data);
  }

  @Get('username-availability/:username')
  async checkUsernameAvailability(@Param('username') username: string) {
    return await this.userService.checkUsernameAvailability(username);
  }
}
