// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { authGuard } from './auth.guard'; // Importáljuk a funkcionális guardot
import { HomeComponent } from './home/home.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'recipe/:id', component: RecipeEditorComponent, pathMatch:'full', canActivate: [authGuard] },
  { path: 'recipe', component: RecipeEditorComponent, pathMatch:'full',  canActivate: [authGuard] },
  { path: 'recipe-list', component: RecipeListComponent, pathMatch:'full', canActivate: [authGuard] },

  { path: '**', redirectTo: '' }
];
