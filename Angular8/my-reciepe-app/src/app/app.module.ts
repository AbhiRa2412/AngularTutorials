import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/share.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    //FormsModule,
    //ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // RecipeModule,
    //ShoppingListModule,
    SharedModule,
    CoreModule,
    //AuthModule
  ],
  providers: [LoggingService],
  bootstrap: [AppComponent]
})
export class AppModule { }