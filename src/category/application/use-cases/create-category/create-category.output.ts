export type CreateCategoryOutput = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
};
