import { Injectable } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { Observable } from 'rxjs';

import { Firestore, collection, collectionData, doc, addDoc, deleteDoc, docData, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private collectionName = 'recipes';

  constructor(private firestore: Firestore) {}

  save(recipe: Recipe) {
    if (recipe.id) {
      this.updateRecipe(recipe.id, recipe);
    } else {
      this.addRecipe(recipe);
    }
  }

  getRecipes() : Observable<Recipe[]> {
    return collectionData(this.getRecipeCollection(), { idField: 'id' }) as Observable<Recipe[]>;
  }

  getRecipeById(id: string): Observable<Recipe> {
    return docData(this.getRecipeDoc(id), { idField: 'id' }) as Observable<Recipe>;
  }

  deleteRecipe(id: string) {
    deleteDoc(this.getRecipeDoc(id)).catch(err => console.error(err));
  }

  private addRecipe(recipe: Recipe) {
    if (recipe.title && recipe.ingredients.length > 0) {
      addDoc(this.getRecipeCollection(), { ...recipe, timestamp: new Date() })
        .then(() => {
          recipe = {
            title: '',
            ingredients: [{ name: '', quantity: 0, quantityType: '' }],
            description: '',
            timestamp: new Date()
          };
        })
        .catch(err => console.error(err));
    }
  }

  private updateRecipe(id: string, recipe: Recipe) {
    updateDoc(this.getRecipeDoc(id), { ...recipe, timestamp: new Date() });
  }

  private getRecipeCollection() {
    return collection(this.firestore, this.collectionName);
  }

  private getRecipeDoc(id: string) {
    return doc(this.firestore, `${this.collectionName}/${id}`);
  }
}
