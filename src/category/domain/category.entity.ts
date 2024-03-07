import { Uuid } from "../../shared/domain/value-objects/uuid.vo"
import { CategoryValidatorFactory } from "./category.validator"

export type CategoryConstructorProps = {
  category_id?: string
  name: string
  description?: string | null
  is_active?: boolean
  created_at?: Date
}

export type CategoryCreateCommand = {
  name: string
  description?: string | null
  is_active?: boolean
}

export class Category {
  category_id: Uuid
  name: string
  description: string | null
  is_active: boolean
  created_at: Date
  notification: any

  constructor(props: CategoryConstructorProps) {
    this.category_id = Uuid.create(props.category_id)
    this.name = props.name
    this.description = props.description ?? null
    this.is_active = props.is_active ?? true
    this.created_at = props.created_at ?? new Date()
  }

  static create(props: CategoryCreateCommand) {
    const category = new Category(props)
    category.validate()
    return category
  }

  changeName(name: string) {
    this.name = name;
    this.validate()
  }

  changeDescription(description: string | null) {
    this.description = description;
    this.validate()
  }

  activate() {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
  }

  toJSON() {
    return {
      category_id: this.category_id.toString(),
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }

  validate(fields?: string[]) {
    const validator = CategoryValidatorFactory.create();
    return validator.validate(this.notification, this, fields);
  }
}
