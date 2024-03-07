import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity"

describe('Category Unit Tests', () => {
  beforeEach(() => {
    Category.prototype.validate = jest
      .fn()
      .mockImplementation(Category.prototype.validate);
  });

  test('constructor', () => {
    let category = new Category({
      name: 'Movie'
    })
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('Movie')
    expect(category.description).toBeNull()
    expect(category.is_active).toBeTruthy()
    expect(category.created_at).toBeInstanceOf(Date)

    let created_at = new Date();
    category = new Category({
      name: 'Movie',
      description: 'some description',
      is_active: false,
      created_at,
    });
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('Movie');
    expect(category.description).toBe('some description');
    expect(category.is_active).toBe(false);
    expect(category.created_at).toBe(created_at);

    category = new Category({
      name: 'Movie',
      description: 'other description',
    });
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('Movie');
    expect(category.description).toBe('other description');
    expect(category.is_active).toBe(true);
    expect(category.created_at).toBeInstanceOf(Date);

    category = new Category({
      name: 'Movie',
      is_active: true,
    });
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('Movie');
    expect(category.description).toBeNull();
    expect(category.is_active).toBe(true);
    expect(category.created_at).toBeInstanceOf(Date);

    created_at = new Date();
    category = new Category({
      name: 'Movie',
      created_at,
    });
    expect(category.category_id).toBeInstanceOf(Uuid);
    expect(category.name).toBe('Movie');
    expect(category.description).toBeNull();
    expect(category.is_active).toBe(true);
    expect(category.created_at).toBe(created_at);
  })

  describe('create command', () => {
    test('should create a category', () => {
      const category = Category.create({
        name: 'Movie',
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(Category.prototype.validate).toHaveBeenCalledTimes(1);
    });

    test('should create a category with description', () => {
      const category = Category.create({
        name: 'Movie',
        description: 'some description',
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBe('some description');
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(Category.prototype.validate).toHaveBeenCalledTimes(1);
    });

    test('should create a category with is_active', () => {
      const category = Category.create({
        name: 'Movie',
        is_active: false,
      });
      expect(category.category_id).toBeInstanceOf(Uuid);
      expect(category.name).toBe('Movie');
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(false);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(Category.prototype.validate).toHaveBeenCalledTimes(1);
    });
  });

  test('should change name', () => {
    const category = new Category({
      name: 'Movie',
    });
    category.changeName('other name');
    expect(category.name).toBe('other name');
    expect(Category.prototype.validate).toHaveBeenCalledTimes(1);
  });

  test('should change description', () => {
    const category = new Category({
      name: 'Movie',
    });
    category.changeDescription('some description');
    expect(category.description).toBe('some description');
    expect(Category.prototype.validate).toHaveBeenCalledTimes(1);
  });

  test('should active a category', () => {
    const category = new Category({
      name: 'Filmes',
      is_active: false,
    });
    category.activate();
    expect(category.is_active).toBe(true);
  });

  test('should disable a category', () => {
    const category = new Category({
      name: 'Filmes',
      is_active: true,
    });
    category.deactivate();
    expect(category.is_active).toBe(false);
  });

  describe('category_id field', () => {
    const arrange = [
      { category_id: null },
      { category_id: undefined },
      { category_id: new Uuid().toString() }
    ];

    test.each(arrange)('should be is %j', (props) => {
      const category = new Category(props as any);
      expect(category.category_id).toBeInstanceOf(Uuid);
    });
  });
});