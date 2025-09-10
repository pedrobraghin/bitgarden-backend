import { StackService } from './stack.service';
import { Controller } from '@nestjs/common';

@Controller('stack')
export class StackController {
  constructor(private readonly StackService: StackService) {}
}
