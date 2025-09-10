import { BatchResult, Stack } from 'src/@types';
import { CreateStackDto } from './dtos';
import { StackRepository } from './stack.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StackService {
  constructor(private readonly stackRepository: StackRepository) {}

  async createStackBatch(
    data: CreateStackDto[],
  ): Promise<BatchResult<Stack, CreateStackDto>> {
    const result: BatchResult<Stack, CreateStackDto> = {
      success: [],
      fail: [],
    };

    const existingStacks = await this.stackRepository.findManyByNameOrSlug(
      data.map((d) => d.name),
      data.map((d) => d.slug),
    );

    const existingMap = new Map(existingStacks.map((s) => [s.slug, s]));

    const promises = data.map(async (stackData) => {
      try {
        if (existingMap.has(stackData.slug)) {
          result.fail.push(stackData);
          return;
        }

        const stack = await this.stackRepository.createStack(stackData);
        result.success.push(stack);
      } catch {
        result.fail.push(stackData);
      }
    });

    await Promise.all(promises);

    return result;
  }
}
