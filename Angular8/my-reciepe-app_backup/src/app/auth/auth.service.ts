import { Injectable, ɵSWITCH_RENDERER2_FACTORY__POST_R3__ } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

import { User } from './user.model';


export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: string,
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    //user = new Subject<User>();
    user = new BehaviorSubject<User>(null);
    private autoLogOutTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    signUp(email: string, password: string) {
        // return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDWh_ML2znkBpohKlaOkPWdX48aXJkBCDg',
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.fireBaseApIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.HandleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        );
    }

    login(email: string, password: string) {
        // return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDWh_ML2znkBpohKlaOkPWdX48aXJkBCDg',
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.fireBaseApIKey,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }

        ).pipe(catchError(this.HandleError),
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        );
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        //localStorage.clear() // will clear all the details in the local storage whihc is not good for deveolpers
        localStorage.removeItem('userData'); //used to remove specific item
        if (this.autoLogOutTimer) {
            clearTimeout(this.autoLogOutTimer);
        }
        this.autoLogOutTimer = null;
    }

    autoLogOut(expirationTime: number) {
        console.log(expirationTime);
        this.autoLogOutTimer = setTimeout(() => {
            this.logout();
        }, expirationTime)
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            return null;
        }

        const loadedUser = new User(
            userData.email,
            userData.id, userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration =
                new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogOut(expirationDuration);
        }

    }

    private handleAuthentication(email: string, localId: string, token: string, expiresIn: number) {
        {
            const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
            const user = new User(email, localId, token, expirationDate);
            this.user.next(user);
            localStorage.setItem('userData', JSON.stringify(user));
            this.autoLogOut(expiresIn * 1000);
        }
    }
    private HandleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknown error occured!";
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                {
                    errorMessage = 'Email already exists!';
                    break;
                }

            case 'EMAIL_NOT_FOUND': {
                errorMessage = "Email not found";
                break;
            }
            case 'INVALID_PASSWORD': {
                errorMessage = "Incorrect Password";
                break;
            }
            default: errorMessage = 'somehting wrong';

        }
        return throwError(errorMessage);
    }
}