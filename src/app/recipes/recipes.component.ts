import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData, doc, addDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Recipe } from '../model/recipe.model';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipes$!: Observable<any[]>;
  newRecipe: Recipe = {
    title: '',
    ingredients: [{ name: '', quantity: 0, quantityType: '' }],
    description: '',
    timestamp: new Date()
  };

  constructor(private firestore: Firestore, private router: Router) {}

  ngOnInit() {
    const recipeCollection = collection(this.firestore, 'recipes');
    this.recipes$ = collectionData(recipeCollection, { idField: 'id' });
  }

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
        .catch(err => console.error(err));
    }
  }

  deleteRecipe(id: string) {
    const recipeDoc = doc(this.firestore, `recipes/${id}`);
    deleteDoc(recipeDoc).catch(err => console.error(err));
  }

  back() {
    this.router.navigate(['']);
  }

  addIngredient() {
    this.newRecipe.ingredients.push({ name: '', quantity: 0, quantityType: '' });
  }

  removeIngredient(index: number) {
    this.newRecipe.ingredients.splice(index, 1);
  }
}
