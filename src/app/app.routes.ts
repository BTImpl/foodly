// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { authGuard } from './auth.guard'; // Importáljuk a funkcionális guardot
import { HomeComponent } from './home/home.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, pathMatch:'full', canActivate: [authGuard] },
  { path: 'recipe/:id', component: RecipeComponent, pathMatch:'full', canActivate: [authGuard] },
  { path: 'recipe', component: AddRecipeComponent, pathMatch:'full',  canActivate: [authGuard] },
  { path: 'recipe-list', component: RecipeListComponent, pathMatch:'full', canActivate: [authGuard] },

  { path: '**', redirectTo: '' }
];
