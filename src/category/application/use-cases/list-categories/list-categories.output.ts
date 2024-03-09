import { PaginationOutput } from "../../../../shared/application/pagination-output";
import { CategoryOutput } from "../shared/category-output";

export type ListCategoriesOutput = PaginationOutput<CategoryOutput>
