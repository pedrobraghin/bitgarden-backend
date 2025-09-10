import { CreateStackBatchDto } from './dtos';
import { StackService } from './stack.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('stacks')
export class StackController {
  constructor(private readonly stackService: StackService) {}

  @Post('batch')
  async createStackBatch(@Body() data: CreateStackBatchDto) {
    return await this.stackService.createStackBatch(data.stacks);
  }
}
