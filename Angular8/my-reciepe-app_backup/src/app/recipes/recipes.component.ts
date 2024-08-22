import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  //selectedRecipe: Recipe

  constructor(){}

  // constructor(private recSer: RecipeService) { }

  ngOnInit() {
    // this.recSer.recipeSelected.subscribe(
    //   (recipe :Recipe) => {
    //     this.selectedRecipe = recipe;
    //   }
    // );
  }

}
