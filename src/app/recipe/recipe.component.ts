import { Component } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../service/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  recipe$: Recipe | null = null;
  recipeId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.recipeId = this.route.snapshot.paramMap.get('id');

    if (this.recipeId) {
      this.recipeService.getRecipeById(this.recipeId).subscribe(
        (recipe: Recipe) => {
          this.recipe$ = recipe;
        }
      );
    }
  }

  back() {
    this.router.navigate(['/recipe-list']);
  }
}
