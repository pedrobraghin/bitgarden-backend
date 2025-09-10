import { StackRepository } from './stack.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StackService {
  constructor(private readonly stackRepository: StackRepository) {}
}
