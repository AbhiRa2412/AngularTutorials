import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    //error = null;
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
    closeSub: Subscription;

    constructor(
        private authSer: AuthService,
        private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        console.log(form.value);
        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;
        let authObs: Observable<AuthResponseData>;
        if (this.isLoginMode) {
            authObs = this.authSer.login(email, password);
        } else {
            authObs = this.authSer.signUp(email, password);
        }

        authObs.subscribe(responseData => {
            this.isLoading = false;
            console.log(responseData);
            this.router.navigate(['/recipes']);
        }, errorMessage => {
            this.isLoading = false;
            //this.error = errorMessage;
            this.showAlertMessage(errorMessage);
            console.log(errorMessage);
        })

        // }, err => {
        //     this.isLoading = false;
        //     this.error = "An error occured!";
        //     console.log(err);
        // })
        form.reset();
    }

    ngOnDestroy() {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }

    }

    // onHandleError() {
    //     this.error = null;
    // }

    private showAlertMessage(message: string) {
        const cmpFact = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostView = this.alertHost.viewContainerRef;
        hostView.clear();
        const componentRef = hostView.createComponent(cmpFact);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostView.clear();
        })

    }


}