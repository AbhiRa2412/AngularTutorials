import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../receipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  recipeSubscription: Subscription;
  recipes: Recipe[];

  // recipes: Recipe[] = [
  //   new Recipe('Kadhai Paneer',
  //     'Spicy and Awesome',
  //     'https://i.ndtvimg.com/i/2017-10/kadhai-paneer-recipe_620x330_71508846265.jpg',
  //   ),
  //   new Recipe('Whoppers Burger',
  //     'classic flame-grilled',
  //     'https://www.seriouseats.com/recipes/images/2015/07/20150728-homemade-whopper-food-lab-35.jpg',

  //   )
  // ];

  constructor(private recSer: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.recipeSubscription = this.recSer.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recSer.getRecipes();
  }
  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // }
  

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.recipeSubscription.unsubscribe();
  }

}

