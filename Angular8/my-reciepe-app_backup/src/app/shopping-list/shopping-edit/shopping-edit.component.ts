import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  // @ViewChild('inputName', { static: true }) nameInputRef: ElementRef;
  // @ViewChild('inputAmount', { static: true }) amountInputRef: ElementRef;
  //@Output() ingredientAdded = new EventEmitter <{name:string, amount: number}>();
  //@Output() ingredientAdded = new EventEmitter<Ingredient>();
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;
  @ViewChild('f', { static: true }) slForm: NgForm;

  constructor(private shoppSer: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppSer.editingStarted.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editItem = this.shoppSer.getIngredient(index);
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      }
    );
  }

  onSubmit(form: NgForm) {
    // const name = this.nameInputRef.nativeElement.value;
    // const amount = this.amountInputRef.nativeElement.value
    const formVal = form.value;
    const ingredient = new Ingredient(formVal.name, formVal.amount);
    //this.ingredientAdded.emit(ingredient);
    //this.shoppSer.onIngredientAdded(ingredient);
    if (this.editMode) {
      this.shoppSer.updateIngredients(this.editItemIndex, ingredient);
    } else {
      this.shoppSer.addIngredient(ingredient);
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.shoppSer.deleteIngredient(this.editItemIndex);
    this.onClear();    
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
