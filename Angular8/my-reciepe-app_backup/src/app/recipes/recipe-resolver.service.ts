import { DataStorageService } from '../shared/data-storage.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../recipes/recipe.model';
import { Injectable } from '@angular/core';
import { RecipeService } from './receipe.service';

@Injectable({ providedIn: 'root' })

export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataStor: DataStorageService, private recipeSer: RecipeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeSer.getRecipes();
        if (recipes.length === 0) {
            return this.dataStor.onFetchRecipes();
        } else {
            return recipes;
        }

    }
}