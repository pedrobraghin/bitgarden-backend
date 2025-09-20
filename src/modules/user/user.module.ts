import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { ProfileModule } from '../profile';
import { UserBuilder } from './user.builder';

@Module({
  imports: [ProfileModule],
  controllers: [UserController],
  providers: [UserBuilder, UserService, UserRepository],
  exports: [UserService, UserRepository, UserBuilder],
})
export class UserModule {}
