import { StackRepository } from './stack.repository';
import { Module } from '@nestjs/common';
import { StackController } from './stack.controller';
import { StackService } from './stack.service';

@Module({
  controllers: [StackController],
  providers: [StackRepository, StackService],
  exports: [StackService, StackRepository],
})
export class StackModule {}
