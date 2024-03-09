import { IUseCase } from '../../../../shared/application/use-case.interface';
import { Uuid } from '../../../../shared/domain/value-objects/uuid.vo';
import { ICategoryRepository } from '../../../domain/category.repository';
import { DeleteCategoryInput } from './delete-category.input';
import { DeleteCategoryOutput } from './delete-category.output';

export class DeleteCategoryUseCase
  implements IUseCase<DeleteCategoryInput, DeleteCategoryOutput>
{
  constructor(private categoryRepo: ICategoryRepository) { }

  async execute(input: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
    const categoryId = new Uuid(input.id);
    await this.categoryRepo.delete(categoryId);
  }
}
