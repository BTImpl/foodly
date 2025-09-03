import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Recipe } from '../model/recipe.model';
import { Observable } from 'rxjs';

import { Firestore, collection, collectionData, doc, addDoc, deleteDoc, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private collectionName = 'recipes';

  constructor(private firestore: Firestore) {}

  // Új recept hozzáadása
  addRecipe(recipe: Recipe) {
   // return this.firestore.collection(this.collectionName).add(recipe);
  }

  // Összes recept lekérése
  getRecipes() : Observable<Recipe[]> {
    const recipeCollection = collection(this.firestore, 'recipes');
    return collectionData(recipeCollection, { idField: 'id' }) as Observable<Recipe[]>;
  }

  // Egy recept lekérése ID alapján
  getRecipeById(id: string): Observable<Recipe> {
    const recipeDoc = doc(this.firestore, `${this.collectionName}/${id}`);
    return docData(recipeDoc, { idField: 'id' }) as Observable<Recipe>;
  }

  // Recept frissítése
  updateRecipe(id: string, recipe: Recipe) {
    //return this.firestore.collection(this.collectionName).doc(id).update(recipe);
  }

  // Recept törlése
  deleteRecipe(id: string) {
    const recipeDoc = doc(this.firestore, `recipes/${id}`);
    deleteDoc(recipeDoc).catch(err => console.error(err));
  }
}
