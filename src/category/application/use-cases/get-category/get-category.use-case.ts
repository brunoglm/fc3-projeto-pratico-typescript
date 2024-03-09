import { IUseCase } from '../../../../shared/application/use-case.interface';
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error';
import { Uuid } from '../../../../shared/domain/value-objects/uuid.vo';
import { Category } from '../../../domain/category.entity';
import { ICategoryRepository } from '../../../domain/category.repository';
import { CategoryOutputMapper } from '../shared/category-output';
import { GetCategoryInput } from './get-category.input';
import { GetCategoryOutput } from './get-category.output';

export class GetCategoryUseCase
  implements IUseCase<GetCategoryInput, GetCategoryOutput>
{
  constructor(private categoryRepo: ICategoryRepository) { }

  async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
    const categoryId = new Uuid(input.id);
    const category = await this.categoryRepo.findById(categoryId);
    if (!category) {
      throw new NotFoundError(input.id, Category);
    }

    return CategoryOutputMapper.toOutput(category)
  }
}
