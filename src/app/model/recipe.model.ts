import { Ingredient } from "./ingredient.model";

export interface Recipe {
  id?: string;
  title: string;
  ingredients: Ingredient[];
  timestamp?: Date;
  description?: string;
}
