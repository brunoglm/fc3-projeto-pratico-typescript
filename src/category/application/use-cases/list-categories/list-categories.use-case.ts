import { PaginationOutputMapper } from '../../../../shared/application/pagination-output';
import { IUseCase } from '../../../../shared/application/use-case.interface';
import {
  CategorySearchParams,
  CategorySearchResult,
  ICategoryRepository,
} from '../../../domain/category.repository';
import { CategoryOutputMapper } from '../shared/category-output';
import { ListCategoriesInput } from './list-categories.input';
import { ListCategoriesOutput } from './list-categories.output';

export class ListCategoriesUseCase
  implements IUseCase<ListCategoriesInput, ListCategoriesOutput>
{
  constructor(private categoryRepo: ICategoryRepository) { }

  async execute(input: ListCategoriesInput): Promise<ListCategoriesOutput> {
    const params = new CategorySearchParams(input);
    const searchResult = await this.categoryRepo.search(params);
    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategorySearchResult): ListCategoriesOutput {
    const { items: _items } = searchResult;
    const items = _items.map((i) => {
      return CategoryOutputMapper.toOutput(i);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}
