import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from '../recipes/receipe.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    isAuthenticated = false;
    private userSubj: Subscription;
    // @Output() featureSelected = new EventEmitter<string>();
    // onSelect(feature: string) {
    //     this.featureSelected.emit(feature);
    // }
    constructor(private dataStorage: DataStorageService, private authSer: AuthService) { }

    ngOnInit() {
        this.userSubj = this.authSer.user.subscribe(user => {
            console.log(!user);
            console.log(!!user);
            this.isAuthenticated = !!user;
        })
    }

    ngOnDestroy() {
        this.userSubj.unsubscribe();
    }

    onSaveData() {
        this.dataStorage.onStoreRecipes();
    }

    onLogout() {
        this.authSer.logout();
    }

    onFetchData() {
        //this.dataStorage.onFetchRecipes();
        this.dataStorage.onFetchRecipes().subscribe();
    }
}