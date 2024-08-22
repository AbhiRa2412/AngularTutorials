import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    // { path: 'recipes', loadChildren: './recipes/recipes.module#RecipeModule' } //not working
    { path: 'recipes', loadChildren: () => import('./recipes/recipe.module').then(m => m.RecipeModule) },
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
]

@NgModule({
    // imports: [RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })], //loading on demand module
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })], // loading all lazy modules on on load
    exports: [RouterModule]
})

export class AppRoutingModule {

}