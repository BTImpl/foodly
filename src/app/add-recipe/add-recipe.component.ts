import { Component } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { Firestore, collection, collectionData, doc, addDoc, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {
  constructor(private firestore: Firestore, private router: Router) {}

    newRecipe: Recipe = {
      title: '',
      ingredients: [{ name: '', quantity: 0, quantityType: '' }],
      description: '',
      timestamp: new Date()
    };

  addRecipe() {
    if (this.newRecipe.title && this.newRecipe.ingredients.length > 0) {
      const recipeCollection = collection(this.firestore, 'recipes');
      addDoc(recipeCollection, { ...this.newRecipe, timestamp: new Date() })
        .then(() => {
          this.newRecipe = {
            title: '',
            ingredients: [{ name: '', quantity: 0, quantityType: '' }],
            description: '',
            timestamp: new Date()
          };
        })
        .then(() => this.router.navigate(['/recipe-list']))
        .catch(err => console.error(err));
    }
  }

   addIngredient() {
    this.newRecipe.ingredients.push({ name: '', quantity: 0, quantityType: '' });
  }

  removeIngredient(index: number) {
    this.newRecipe.ingredients.splice(index, 1);
  }

  back() {
    this.router.navigate(['/recipe-list']);
  }
}
