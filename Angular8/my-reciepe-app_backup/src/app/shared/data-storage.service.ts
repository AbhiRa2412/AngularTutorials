import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { RecipeService } from '../recipes/receipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeSer: RecipeService, private authSer: AuthService) { }

    onStoreRecipes() {
        const recipes = this.recipeSer.getRecipes();
        this.http.put('https://receipe-book-3b3bf.firebaseio.com/recipes.json', recipes).
            subscribe(responseData => {
                console.log(responseData);
            })
    }

    onFetchRecipes() {
        // this.http.get<Recipe[]>('https://receipe-book-3b3bf.firebaseio.com/recipes.json').
        //     pipe(map(recipes => {
        //         return recipes.map(recipe => {
        //             return {
        //                 ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
        //             }
        //         });
        //     })).
        //     subscribe(recipes => {
        //         console.log(recipes);
        //         this.recipeSer.setRecipes(recipes);
        //     })

        return this.http.get<Recipe[]>('https://receipe-book-3b3bf.firebaseio.com/recipes.json').pipe(
            map(recipes => {
                return recipes.map(recipe => {
                    return {
                        ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
                    }
                });
            }),
            tap(recipes => {
                this.recipeSer.setRecipes(recipes);
            })
        );


        // return this.http.get<Recipe[]>('https://receipe-book-3b3bf.firebaseio.com/recipes.json').
        //     pipe(map(recipes => {
        //         return recipes.map(recipe => {
        //             return {
        //                 ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
        //             }
        //         });
        //     }), tap(recipes => {
        //         this.recipeSer.setRecipes(recipes);
        //     }));
    }
}