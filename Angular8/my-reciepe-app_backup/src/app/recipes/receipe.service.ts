import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable()

export class RecipeService {
    //recipeSelected = new EventEmitter<Recipe>();
    recipesChanged = new Subject<Recipe[]>();

    constructor(private slService: ShoppingListService) { }

    // private recipes: Recipe[] = [
    //     new Recipe('Kadhai Paneer',
    //         'Spicy and Awesome',
    //         'https://i.ndtvimg.com/i/2017-10/kadhai-paneer-recipe_620x330_71508846265.jpg',
    //         [
    //             new Ingredient('Paneer', 20),
    //             new Ingredient('French Fries', 20)
    //         ]),
    //     new Recipe('Whoppers Burger',
    //         'classic flame-grilled',
    //         'https://www.seriouseats.com/recipes/images/2015/07/20150728-homemade-whopper-food-lab-35.jpg',
    //         [
    //             new Ingredient('Meat', 2),
    //             new Ingredient('Naan', 1)
    //         ]
    //     )
    // ];

    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    onAddIngredientToShoppingList(ingredient: Ingredient[]) {
        this.slService.addIngredients(ingredient);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());

    }
}