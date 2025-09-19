import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recipe } from '../model/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'app-recipe-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.css'],
})
export class RecipeEditorComponent implements OnInit {
  recipe: Recipe = {
    title: '',
    ingredients: [{ name: '', quantity: 0, quantityType: '' }],
    description: '',
    calories: 0,
    timestamp: new Date(),
  };

  isEditMode = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    const recipeId = this.activatedRoute.snapshot.paramMap.get('id');
    if (recipeId) {
      this.recipeService.getRecipeById(recipeId).subscribe((recipe) => {
        this.recipe = recipe;
      });
    } else {
      this.isEditMode = true; // Új recept esetén azonnal szerkesztési módba lépünk
    }
  }

  addIngredient() {
    this.recipe.ingredients.push({ name: '', quantity: 0, quantityType: '' });
  }

  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }

  toggleEditMode() {
    if (this.recipe.id) {
      this.isEditMode = !this.isEditMode;
    } else {
      this.back();
    }
  }

  back() {
    this.router.navigate(['/recipe-list']);
  }

  onSubmit() {
    this.recipeService.save(this.recipe);
    this.toggleEditMode();
  }
}
