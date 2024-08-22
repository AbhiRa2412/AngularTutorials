import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  // ingredients: Ingredient[] = [
  //   new Ingredient('Apples', 5),
  //   new Ingredient('Tomatoes', 10),
  // ];  

  ingredients: Ingredient[];
  private ingSubscription: Subscription;

  constructor(private shppSer: ShoppingListService,private logSer:LoggingService) { }

  ngOnInit() {
    this.ingredients = this.shppSer.getIngredients();
    this.ingSubscription = this.shppSer.ingredientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
    this.logSer.printLog('Hello from Shopping List in ngOnInit');
  }

  ngOnDestroy() {
    this.ingSubscription.unsubscribe();
  }

  onEditItem(index:number){
    this.shppSer.editingStarted.next(index);
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  //   this.shppSer.addIngredient(ingredient);
  // }
}
