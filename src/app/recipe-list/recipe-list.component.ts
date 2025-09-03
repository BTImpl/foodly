import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import { Recipe } from '../model/recipe.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  imports: [CommonModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  isInDeleteMode: boolean = false;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit() {
    this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  openRecipe(recipe: Recipe) {
    this.router.navigate(['/recipe', recipe.id]);
  }

  newRecipe() {
    this.router.navigate(['/recipe']);
  }

  toggleDeleteMode() {
    this.isInDeleteMode = !this.isInDeleteMode;
  }

  deleteRecipe(recipe: Recipe) {
    if (recipe.id) {
      this.recipeService.deleteRecipe(recipe.id);
    }
  }
}
